define([
  "pentaho/visual/base/View",
  "pentaho/i18n!View"
], function(Visual, bundle) {
  "use strict";

  /*global document:true, window:false*/

  /**
   * @name View
   * @class
   *
   * @description Creates a calculator `View`.
   */
  return Visual.extend({
    /** @override */
    _init: function() {
      this._setupHtmlSpan();
    },

    /** @override */
    _render: function() {
      var result = this._calculate();

      this.numSpan.innerHTML = bundle.get("dev_result", [result]);

      var width = this.model.getv("width");
      var height = this.model.getv("height");
      this._resize(width, height);
    },

    /** @override */
    _resize: function(width, height) {
      // Center the span
      this.numSpan.style.width = width + "px";
      this.numSpan.style.height  = height + "px";
    },

    /** @override */
    dispose: function() {
      this.base();

      this.numSpan = null;
    },

    // ---------

    _setupHtmlSpan: function() {
      this.numSpan = document.createElement("span");
      this.numSpan.style.fontSize = "42px";
      this.numSpan.style.position = "relative";
      this.numSpan.style.display = "block";
      this.numSpan.style.overflow = "scroll";
      this.element.appendChild(this.numSpan);
    },

    _calculate: function() {
      var dataTable = this.model.getv("data");
      var R = dataTable.getNumberOfRows();

      var measure = this.model.getv("measure");
      var jMeasure = dataTable.model.attributes.get(measure);
      if (!jMeasure || !jMeasure.ordinal) {
        window.alert("Invalid measure!");
        return;
      }

      var measureOrdinal = jMeasure.ordinal;

      var getValue = function(k) {
        var v = dataTable.getValue(k, measureOrdinal);
        return !isNaN(v) && v != null ? v : null;
      };

      var i;

      var value = null;
      var op = this.model.getv("operation");

      if (!op) {
        return null;
      }

      switch (op) {
        case "max":
          for (i = 0; i < R; i++) {
            var vi = getValue(i);

            if (vi != null) {
              value = value == null ? vi : Math.max(value, vi);
            }
          }

          break;

        case "min":
          for (i = 0; i < R; i++) {
            var vi = getValue(i);

            if (vi != null) {
              value = value == null ? vi : Math.min(value, vi);
            }
          }

          break;

        case "avg":
          var total = 0;

          if (R) {
            for (i = 0; i < R; i++) {
              var vi = getValue(i);

              if (vi != null) {
                total += vi;
              }
            }

            value = total / R;
          } else {
            value = 0;
          }
          break;

        case "sum":
          value = 0;

          for (i = 0; i < R; i++) {
            var vi = getValue(i);

            if (vi != null) {
              value += vi;
            }
          }

          break;
      }

      return value;
    }
  });
});
