self.qsaObserver = (function (exports) {
  'use strict';

  var elements = function elements(element) {
    return 'querySelectorAll' in element;
  };

  var filter = [].filter;
  var index = (function (options) {
    var callback = function callback(records) {
      var query = options.query;

      if (query.length) {
        for (var i = 0, length = records.length; i < length; i++) {
          loop(filter.call(records[i].addedNodes, elements), true, query);
          loop(filter.call(records[i].removedNodes, elements), false, query);
        }
      }
    };

    var flush = function flush() {
      callback(observer.takeRecords());
    };

    var loop = function loop(elements, connected, query) {
      var set = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Set();

      for (var element, i = 0, length = elements.length; i < length; i++) {
        if (!set.has(element = elements[i])) {
          set.add(element);

          for (var m = matches(element), _i = 0, _length = query.length; _i < _length; _i++) {
            if (m.call(element, query[_i])) options.handle(element, connected, _i);
          }

          loop(element.querySelectorAll(query), connected, query, set);
        }
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
      flush: flush,
      observer: observer,
      parse: parse
    };
  });

  exports.default = index;

  return exports;

}({}).default);
