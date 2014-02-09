'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pong: {
            webapp: 'src/web-app',
            elo_service: 'src/services/elo',
            tests_go: 'test/services/elo/services',
            tests_server: 'test/web-app/server',
            tests_client: 'test/web-app/client'
        },
        jshint: {
            files: [
                '<%= pong.webapp %>/controllers/**/*.js',
                '<%= pong.webapp %>/lib/**/*.js',
                '<%= pong.webapp %>/models/**/*.js',
                '<%= pong.webapp %>/public/js/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        less: {
            build: {
                options: {
                    yuicompress: true,
                    paths: ['public/css']
                },
                files: {
                    '.build/css/app.css': '<%= pong.webapp %>/public/css/app.less'
                }
            }
        },
        makara: {
            files: ['<%= pong.webapp %>/public/templates/**/*.dust'],
            options: {
                contentPath: ['<%= pong.webapp %>/locales/**/*.properties']
            }
        },
        dustjs: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/',
                        src: '**/*.dust',
                        dest: '.build/templates',
                        ext: '.js'
                    }
                ],
                options: {
                    fullname: function (filepath) {
                        var path = require('path'),
                            name = path.basename(filepath, '.dust'),
                            parts = filepath.split(path.sep),
                            fullname = parts.slice(3, -1).concat(name);

                        return fullname.join(path.sep);
                    }
                }
            }
        },
        copyto: {
            build: {
                files: [
                    { cwd: 'public', src: ['**/*'], dest: '.build/' }
                ],
                options: {
                    ignore: [
                        '<%= pong.webapp %>/public/css/**/*',
                        '<%= pong.webapp %>/public/js/**/*',
                        '<%= pong.webapp %>/public/templates/**/*'
                    ]
                }
            }
        },
        clean: {
            'tmp': 'tmp',
            'build': '.build/templates'
        },
        mochacli: {
            src: ['<%= pong.tests_server %>/**/*.js'],
            options: {
                globals: ['chai'],
                timeout: 6000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        watch: {
            src: {
                files: [
                    '<%= pong.webapp %>/public/**/*.js',
                    '<%= pong.webapp %>/public/**/*.dust',
                    '<%= pong.webapp %>/public/**/*.html',
                    '<%= pong.webapp %>/public/**/*.less'
                ],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            },
            testClient: {
                files: ['<%= pong.tests_client %>/**/*.js'],
                tasks: ['karma'],
                options: {
                    spawn: false
                }
            },
            testServer: {
                files: ['<%= pong.tests_server %>/**/*.js'],
                tasks: ['mochacli'],
                options: {
                    spawn: false
                }
            },
            testGo: {
                files: [
                    '<%= pong.tests_go %>/**/*.go',
                    '<%= pong.elo_service %>/**/*.go'
                ],
                tasks: ['go:test:elo'],
                options: {
                    spawn: false
                }
            }
        },
        go: {
            options: {
                GOPATH: ['<%= pong.elo_service %>']
            },
            elo: {
                output: 'eloService',
                root: '<%= pong.elo_service %>/src',
                run_files: ['main.go'],
                pckgs: ['../../../../<%= pong.tests_go %>']
            }
        },
        execute: {
            webApp: {
                src: ['index.js']
            }
        },
        parallel: {
            servers: {
                options: {
                  stream: true
                },
                tasks: [{
                  grunt: true,
                  args: ['execute:webApp']
                }, {
                  grunt: true,
                  args: ['go:run:elo']
                }]
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.loadTasks('./node_modules/makara/tasks/');

    grunt.registerTask('i18n', ['clean', 'makara', 'dustjs', 'clean:tmp']);
    grunt.registerTask('build', ['jshint', 'less', 'copyto', 'i18n', 'go:build:elo']);
    grunt.registerTask('test', ['jshint', 'mochacli', 'karma', 'go:test:elo']);
    grunt.registerTask('serve', ['parallel:servers']);
};
