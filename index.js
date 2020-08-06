self.qsaObserver = (function (exports) {
  'use strict';

  var elements = function elements(element) {
    return 'querySelectorAll' in element;
  };

  var filter = [].filter;
  var index = (function (options) {
    var empty = new Set();
    var live = new WeakMap();

    var callback = function callback(records) {
      var query = options.query;

      if (query.length) {
        for (var i = 0, length = records.length; i < length; i++) {
          loop(filter.call(records[i].addedNodes, elements), true, query);
          loop(filter.call(records[i].removedNodes, elements), false, query);
        }
      }
    };

    var drop = function drop(elements) {
      for (var i = 0, length = elements.length; i < length; i++) {
        live["delete"](elements[i]);
      }
    };

    var flush = function flush() {
      callback(observer.takeRecords());
    };

    var loop = function loop(elements, connected, query) {
      var set = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Set();

      var _loop = function _loop(_on, _sel, _element, i, length) {
        // guard against repeated elements within nested querySelectorAll results
        if (!set.has(_element = elements[i])) {
          set.add(_element);
          _on = live.has(_element);

          if (connected) {
            for (var q, s = _on ? live.get(_element) : empty, m = matches(_element), _i = 0, _length = query.length; _i < _length; _i++) {
              // guard against selectors that were handled already
              if (!s.has(q = query[_i]) && m.call(_element, q)) {
                if (!_on) {
                  _on = !_on;
                  live.set(_element, s = new Set());
                }

                s.add(q);
                options.handle(_element, connected, q);
              }
            }
          } // guard against elements that never became live
          else if (_on) {
              _sel = live.get(_element);
              live["delete"](_element);

              _sel.forEach(function (q) {
                options.handle(_element, connected, q);
              });
            }

          loop(_element.querySelectorAll(query), connected, query, set);
        }

        on = _on;
        sel = _sel;
        element = _element;
      };

      for (var on, sel, element, i = 0, length = elements.length; i < length; i++) {
        _loop(on, sel, element, i);
      }
    };

    var matches = function matches(element) {
      return element.matches || element.webkitMatchesSelector || element.msMatchesSelector;
    };

    var parse = function parse(elements) {
      var connected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      loop(elements, connected, options.query);
    };

    var observer = new MutationObserver(callback);
    var root = options.root || document;
    var query = options.query;
    observer.observe(root, {
      childList: true,
      subtree: true
    });
    if (query.length) parse(root.querySelectorAll(query));
    return {
      drop: drop,
      flush: flush,
      observer: observer,
      parse: parse
    };
  });

  exports.default = index;

  return exports;

}({}).default);
