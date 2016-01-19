/* globals module */
'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  initializing: function () {
    this.local_pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    if(!this.local_pkg.name) {
      this.local_pkg.name = this.determineAppname().replace(/\s+/g, '-').toLowerCase();
    }
  },

  writing: {
    packageJSON: function () {
      var template_pkg = this.fs.readJSON(this.templatePath('_package.json'));

      if(!this.local_pkg.version) {
        this.local_pkg.version = '0.1.0';
      }

      if(!this.local_pkg.description) {
        this.local_pkg.description = !!template_pkg.description ? template_pkg.description : '';
      }

      if(!!template_pkg.main && !this.local_pkg.main) {
        this.local_pkg.main = template_pkg.main;
      }

      if(!!template_pkg.config) {
        if(!this.local_pkg.config) {
          this.local_pkg.config = {};
        }

        for(var key in template_pkg.config) {
          if(!this.local_pkg.config[key]) {
            this.local_pkg.config[key] = template_pkg.config[key];
          }
        }
      }

      if(!!template_pkg.scripts) {
        if(!this.local_pkg.scripts) {
          this.local_pkg.scripts = {};
        }

        for(var key in template_pkg.scripts) {
          if(!this.local_pkg.scripts[key]) {
            this.local_pkg.scripts[key] = template_pkg.scripts[key];
          }
        }
      }

      if(!!template_pkg.themes && !this.local_pkg.themes) {
        this.local_pkg.themes = template_pkg.themes;
      }

      this.fs.writeJSON(this.destinationPath('package.json'), this.local_pkg);
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore'));
    },

    i18n: function () {
      this.fs.copyTpl(
        this.templatePath('src/i18n/*'),
        this.destinationPath('src/i18n'),
        {
          name: this.local_pkg.name,
          description: this.local_pkg.description
        });
    },

    themes: function () {
      this.fs.copyTpl(
        this.templatePath('src/themes/**/*'),
        this.destinationPath('src/themes'),
        {
          name: this.local_pkg.name,
          description: this.local_pkg.description
        });
    },

    scripts: function () {
      this.fs.copyTpl(
        this.templatePath('src/*.js'),
        this.destinationPath('src'),
        {
          name: this.local_pkg.name,
          description: this.local_pkg.description
        }
      );
    }
  },

  install: function () {
    this.npmInstall(['git+https://github.com/carlosrusso/pentaho-platform-plugin-common-ui.git#BACKLOG-6020', 'pentaho-viz-sandbox'], {'save-dev': true});
  }
});
