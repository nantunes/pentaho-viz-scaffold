#!/usr/bin/env node
'use strict';

var yeoman = require('yeoman-environment');

var env = yeoman.createEnv();

env.on('error', function (err) {
  console.error('Error', process.argv.slice(2).join(' '), '\n');
  console.error(err.stack);
  process.exit(err.code || 1);
});

env.register(require.resolve('./gen/index'), 'pentaho:viz-gen');

// In its simplest form
env.run('pentaho:viz-gen');
