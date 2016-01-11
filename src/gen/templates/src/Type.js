define([
  'pentaho/visual',
  'pentaho/i18n!Type',
  'pentaho/theme!Type'
], function(visualFactory, bundle) {
  'use strict';

  return function(context) {
    var Visual = context.get(visualFactory);

    return Visual.extend({
      meta: {
        id: '<%= name %>',
        view: 'View',
        styleClass: '<%= name %>-style',
        props: [
          {
            name: 'levels',
            type: 'stringBinding',
            list: true,
            required: true
          },
          {
            name: 'measure',
            type: {
              base: 'role',
              otherTypes: ['number']
            },
            required: true
          },
          {
            name: 'operation',
            type: {
              base: 'string',
              domain: ['min', 'max', 'avg', 'sum']
            },
            value: 'min'
          }
        ]
      }
    })
    .implement({meta: bundle.structured});
  };
});
