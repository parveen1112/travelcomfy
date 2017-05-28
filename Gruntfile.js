module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        paths: {
            srcJs: 'assets/js',
            destJs: 'public/js',
            srcImg: 'assets/images',
            destImg: 'public/images',
            srcCSS : 'assets/styles',
            destCSS : 'public/styles',
            srcTemplates : 'assets/js/templates',
            destTemplates : 'public/js/templates',
            srcResource : 'assets/resources',
            destResource : 'public/resources',
            srcLib : 'assets/js/libs/vendor',
            destLib : 'public/js/libs/vendor'
        },
        'copy':{
            main: {
                files: [
                {
                    expand: true,
                    cwd: '<%= paths.srcResource %>',
                    src: ['**'],
                    dest: '<%= paths.destResource %>'
                }]
            },
            img: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.srcImg %>',
                    src: ['**'],
                    dest: '<%= paths.destImg %>'
                }]
            },
            //Required ejs-amd to be run first
            templates: {
                files :[{
                    expand: true,
                    cwd: '<%= paths.srcTemplates %>',
                    src: ['*.js'],
                    dest: '<%= paths.destTemplates %>'
                }]
            },
            libs : {
                files :[{
                    expand: true,
                    cwd: '<%= paths.srcLib %>',
                    src: ['jquery-ui/**', 'requirejs/**'],
                    dest: '<%= paths.destLib %>'
                }]
            }
        },
        lesstocss : {
            '<%= paths.destCSS %>/site.css': '<%= paths.srcCSS %>/site.less'
        },
        less: {
            dev: {
                options: {
                    paths: ['<%= paths.srcCSS %>']
                },
                files: '<%= lesstocss %>'
            },
            live: {
                options: {
                    paths: ['<%= paths.srcCSS %>'],
                    cleancss: true,
                    compress: true
                },
                files: '<%= lesstocss %>'
            }
        },
        'cssmin' : {
            dist: {
                src: [ '<%= paths.destCSS%>' + '/site.css'],
                dest: '<%= paths.destCSS%>' + '/site.min.css'
            }
        },
        githooks: {
            all: {
                'pre-commit': 'jshint'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                '<%= paths.srcJs %>/app/*.js'
            ]
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'assets/js',
                    mainConfigFile: 'assets/js/main.js',
                    name: 'main',
                    optimize: 'uglify2',
                    wrap: true,
                    out: '<%= paths.destJs %>/main.js',
                    uglify2: {
                        output: {
                            beautify: false
                        },
                        compress: {
                            sequences: true,
                            global_defs: {
                                DEBUG: false
                            }
                        },
                        warnings: false
                    },
                    preserveLicenseComments: false,
                    findNestedDependencies: true,
                    useStrict: true
                }
            },
            dev: {
                options: {
                    baseUrl: 'assets/js',
                    mainConfigFile: 'assets/js/main.js',
                    dir: '<%= paths.destJs %>',
                    skipDirOptimize: true,
                    preserveLicenseComments: false,
                    findNestedDependencies: true,
                    useStrict: true
                }

            }
        },
        watch: {
            scriptDev: {
                files: ['<%= paths.srcJs %>/app/*.js'],
                tasks: ['jshint', 'requirejs:dev', 'copy']
            },
            lessDev : {
                files: ['<%= paths.srcCSS %>/*.less'],
                tasks: ['less:dev', 'cssmin']
            }
        }
    });
    grunt.registerTask('default',['githooks', 'less:dev', 'cssmin', 'jshint', 'requirejs:dev', 'copy',  'watch']);
    grunt.registerTask('dev',['githooks', 'less:dev', 'cssmin', 'jshint', 'requirejs:dev', 'copy']);
    grunt.registerTask('live',['less:live', 'cssmin', 'jshint', 'cssmin', 'requirejs:compile', 'copy']);
}