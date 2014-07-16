// Generated on 2014-07-13 using generator-ember 0.8.4
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    console.log(dir);
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        // Reads the projects .htmlhintrc file and applies coding standards.
        htmlhint: {
            options: {
                htmlhintrc: ".htmlhintrc"
            },
            src: ["app/templates/**/*.hbs", "app/app.html.tpl"]
        },

        /*
            Finds Handlebars templates and precompiles them into functions.
            The provides two benefits:

            1. Templates render much faster
            2. We only need to include the handlebars-runtime microlib
                and not the entire Handlebars parser.

            Files will be written out to dependencies/compiled/templates.js
            which is required within the project files so will end up
            as part of our application.

            The compiled result will be stored in
            Ember.TEMPLATES keyed on their file path (with the "app/templates" stripped)
        */
        emberTemplates: {
            options: {
                templateName: function (sourceFile) {
                    return sourceFile.replace(/app\/templates\//, "");
                }
            },
            // dist: {
            //     files: {
            //         '.tmp/scripts/compiled-templates.js': '<%= yeoman.app %>/templates/**/*.hbs'
            //     }
            // },
            all: {
                files: {
                    "dependencies/compiled/templates.js": [
                        "app/templates/**/*.hbs",
                    ]
                }
            }
        },

        /*
            A simple ordered concatenation strategy.
            This will start at app/app.js and begin adding dependencies in the correct order
            writing their string contents into "build/application.js"

            Additionally it will wrap them in evals with @ sourceURL statements so errors, log
            statements and debugging will reference the source files by line number.

            You would set this option to false for production.
        */
        neuter: {
            debug: {
                options: {
                    includeSourceURL: true
                },
                files: { "training-log.js": ["app/app.js", "app/instruments/debug.js"] }
            },
            dist: {
                options: {
                    includeSourceURL: false
                },
                files: { "training-log.js": ["app/app.js"] }
            },
            app: {
                options: {
                    includeSourceURL: false,
                    filepathTransform: function (filepath) {
                        return yeomanConfig.app + '/' + filepath;
                    }
                },
                files: { "training-log.js": ["app/app.js"] },
                src: "app/app.js",
                dest: "training-log.js"
            }
        },

        /*
            Reads the projects .jshintrc file and applies coding
            standards. Doesn't lint the dependencies or test support files.
        */
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files: {
                src: [
                    "Gruntfile.js",
                    "app/**/*.js",
                    "!dependencies/**/*.*",
                    "!test/support/*.*"
                ]
            },
            all: [
                'Gruntfile.js',
                'app/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Compile all LESS files into a large CSS file.
        less: {
            debug: {
                options: {
                    paths: ["app/styles"],
                    strictImports: true
                },
                files: {
                    "training-log.css": [
                        "app/styles/{,*/}*.less",
                        "app/styles/{,*/}*.css"
                    ]
                }
            },
            dist: {
                options: {
                    paths: ["app/styles"],
                    strictImports: true,
                    yuicompress: true
                },
                files: {
                    "training-log.css": [
                        "app/styles/*.less",
                        "app/styles/*.css"
                    ]
                }
            }
        },

        connect: {
            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            connect.static(require('path').resolve('.')),
                            connect.static(require('path').resolve('app'))
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'test'),
                            mountFolder(connect, '.tmp')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        compass: {
            options: {
                // sassDir: '<%= yeoman.app %>/styles',
                cssDir: 'app/styles',
                generatedImagesDir: 'images/generated',
                imagesDir: 'images',
                javascriptsDir: 'app',
                fontsDir: 'app/styles/fonts',
                importPath: 'app/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '.tmp/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },

        // Copy and minify the main html file.
        htmlmin: {
            debug: {
                options: {
                    removeComments: false,
                    collapseWhitespace: false
                },
                files: {
                    "index.html": "app/app.html.tpl"
                }
            },
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    "index.html": "app/app.html.tpl"
                }
            }
        },

        /*
            Watch files for changes.

            Changes in dependencies/ember.js or application javascript will trigger the neuter task.
            Changes to any templates will trigger the emberTemplates task (which writes a new compiled
            file into dependencies/) and then neuter all the files again.
        */
        watch: {
            dependency_code: {
                files: ["dependencies/scripts/*.js"],
                tasks: ["neuter:debug"]
            },
            dependency_styles: {
                files: ["dependencies/styles/**/*.less"],
                tasks: ["less:debug"]
            },
            app_markup: {
                files: ["app/app.html.tpl"],
                tasks: ["htmlmin:debug"]
            },
            app_code: {
                files: ["app/**/*.js"],
                tasks: ["neuter:debug"]
            },
            app_styles: {
                files: ["app/styles/**/*.less"],
                tasks: ["less:debug"]
            },
            app_templates: {
                files: "app/templates/**/*.hbs",
                tasks: ["emberTemplates", "neuter:debug"]
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    'app/*.js',
                    'app/**/*.js',
                    'app/*.html',
                    '{app, app/styles/{,*/}*.css',
                    'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        replace: {
          app: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.js',
                ember_data: 'bower_components/ember-data/ember-data.js'
              }
            },
            files: [
              {src: '<%= yeoman.app %>/index.html', dest: '.tmp/index.html'}
            ]
          },
          dist: {
            options: {
              variables: {
                ember: 'bower_components/ember/ember.prod.js',
                ember_data: 'bower_components/ember-data/ember-data.prod.js'
              }
            },
            files: [
              {src: '<%= yeoman.app %>/index.html', dest: '.tmp/index.html'}
            ]
          }
        },
        // Put files not handled in other tasks here
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        filter: 'isFile',
                        cwd: '<%= yeoman.app %>/bower_components/',
                        dest: '<%= yeoman.app %>/styles/fonts/',
                        src: [
                            'bootstrap-sass-official/vendor/assets/fonts/bootstrap/**'
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}',
                            'styles/fonts/*'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            server: [
                'emberTemplates',
                'compass:server'
            ],
            test: [
                'emberTemplates',
                'compass'
            ],
            dist: [
                'emberTemplates',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ember-templates");
    grunt.loadNpmTasks("grunt-hashres");
    grunt.loadNpmTasks("grunt-htmlhint");
    grunt.loadNpmTasks("grunt-neuter");
    grunt.loadNpmTasks("grunt-bump");
    grunt.loadNpmTasks("grunt-shell-spawn");

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'replace:app',
            'concurrent:server',
            'neuter:app',
            'copy:fonts',
            'connect:livereload',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask("rebuild", [
        // "replace:app",
        // "copy:fonts",
        'concurrent:server',
        "emberTemplates",
        "neuter:debug",
        "less:debug",
        "htmlmin:debug",
        "connect:livereload",
        "watch"
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'replace:app',
        'concurrent:test',
        'connect:test',
        'neuter:app',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'replace:dist',
        'useminPrepare',
        'concurrent:dist',
        'neuter:app',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
