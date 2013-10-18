'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        config: {
            app: 'public',
            dist: 'dist'
        },
        watch: {
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css'],
                tasks: ['sass']
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                unused: false,
                browser: true,
                strict: true,
                jquery: true,
                globals: {
                    angular:true,
                    console: true
                }
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= config.dist %>/scripts/scripts.js': [
                        '<%= config.dist %>/scripts/scripts.js'
                    ]
                }
            }
        }
    });

    grunt.registerTask('test', [
        //'clean:server',
        'jshint',
        'karma'
    ]);

    grunt.registerTask('build', [
        //'clean:dist',
        'copy:dist',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'test',
        'build'
    ]);
};
