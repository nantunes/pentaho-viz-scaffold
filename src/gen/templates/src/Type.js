define([
  "pentaho/visual/base/modelFactory",
  "pentaho/i18n!Type"
], function(visualFactory, bundle) {

  "use strict";

  return function(context) {

    var Visual = context.get(visualFactory);

    return Visual.extend({
        meta: {
          id: '<%= name %>',
          v2Id: '<%= name %>',

          view: "src/View",
          styleClass: '<%= name %>-style',
          props: [
            {
              name: "measure",
              required: true
            },
            {
              name: "operation",
              type: {
                base: "string",
                domain: ["min", "max", "avg", "sum"]
              },
              value: "min"
            }
          ]
        }
      })
      .implement({meta: bundle.structured});
  };
});
