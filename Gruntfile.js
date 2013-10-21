module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        src: {
            js: ['public/scripts/**/*.js'/*, 'app.js'*/]
        },
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
            files:['Gruntfile.js', '<%= src.js %>'],
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true,
                unused: false,
                browser: true,
                jquery: true,
                globals: {
                    angular: true,
                    console: true
                }
            }
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
        'karma',
        'jshint'
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
