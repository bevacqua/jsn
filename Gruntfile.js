module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jasmine_node: {
            matchall: true,
            forceExit: true
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.registerTask('default', 'jasmine_node');

    grunt.registerTask('travis', 'jasmine_node');
};