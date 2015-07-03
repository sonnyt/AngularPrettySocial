'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        uglify: {
            dist: {
                files: {
                    'dist/prettySocial.min.js': 'src/prettySocial.js'
                }
            }
        }
    });

    grunt.registerTask('build', ['uglify']);
};
