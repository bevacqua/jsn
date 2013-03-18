module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine_node: {
            matchall: true,
            forceExit: true
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    console: true,
                    module: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('default', ['jshint', 'jasmine_node']);
    grunt.registerTask('travis', ['jshint', 'jasmine_node']);
};