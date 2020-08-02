'use strict';
const elements = element => 'querySelectorAll' in element;
const {filter} = [];

module.exports = options => {
  const live = new WeakMap;
  const callback = records => {
    const {query} = options;
    if (query.length) {
      for (let i = 0, {length} = records; i < length; i++) {
        loop(filter.call(records[i].addedNodes, elements), true, query);
        loop(filter.call(records[i].removedNodes, elements), false, query);
      }
    }
  };
  const drop = elements => {
    for (let i = 0, {length} = elements; i < length; i++)
      live.delete(elements[i]);
  };
  const flush = () => {
    callback(observer.takeRecords());
  };
  const loop = (elements, connected, query, set = new Set) => {
    for (let selectors, element, i = 0, {length} = elements; i < length; i++) {
      // guard against repeated elements within nested querySelectorAll results
      if (!set.has(element = elements[i])) {
        set.add(element);
        if (connected) {
          for (let q, m = matches(element), i = 0, {length} = query; i < length; i++) {
            if (m.call(element, q = query[i])) {
              if (!live.has(element))
                live.set(element, new Set);
              selectors = live.get(element);
              // guard against selectors that were handled already
              if (!selectors.has(q)) {
                selectors.add(q);
                options.handle(element, connected, q);
              }
            }
          }
        }
        // guard against elements that never became live
        else if (live.has(element)) {
          selectors = live.get(element);
          live.delete(element);
          selectors.forEach(q => {
            options.handle(element, connected, q);
          });
        }
        loop(element.querySelectorAll(query), connected, query, set);
      }
    }
  };
  const matches = element => (
    element.matches ||
    element.webkitMatchesSelector ||
    element.msMatchesSelector
  );
  const parse = (elements, connected = true) => {
    loop(elements, connected, options.query);
  };
  const observer = new MutationObserver(callback);
  const root = options.root || document;
  const {query} = options;
  observer.observe(root, {childList: true, subtree: true});
  if (query.length)
    parse(root.querySelectorAll(query));
  return {drop, flush, observer, parse};
};
