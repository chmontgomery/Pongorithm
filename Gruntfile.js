'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jshint: {
      files: ['controllers/**/*.js', 'lib/**/*.js', 'models/**/*.js'],
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
          '.build/css/app.css': 'public/css/app.less'
        }
      }
    },
    makara: {
      files: ['public/templates/**/*.dust'],
      options: {
        contentPath: ['locales/**/*.properties']
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
            'public/css/**/*',
            'public/js/**/*',
            'public/templates/**/*'
          ]
        }
      }
    },
    clean: {
      'tmp': 'tmp',
      'build': '.build/templates'
    },
    mochacli: {
      src: ['test/*.js'],
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
        files: ['public/**/*.js','public/**/*.dust','public/**/*.html','public/**/*.less'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      },
      test: {
        files: ['test/**/*.js'],
        tasks: ['test'],
        options: {
          spawn: false
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.loadTasks('./node_modules/makara/tasks/');

  grunt.registerTask('i18n', ['clean', 'makara', 'dustjs', 'clean:tmp']);
  grunt.registerTask('build', ['jshint', 'less', 'copyto', 'i18n']);
  grunt.registerTask('test', ['jshint', 'mochacli', 'karma']);

};
