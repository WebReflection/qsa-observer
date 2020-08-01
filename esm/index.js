const elements = element => 'querySelectorAll' in element;
const {filter} = [];

export default options => {
  const callback = records => {
    const {query} = options;
    if (query.length) {
      for (let i = 0, {length} = records; i < length; i++) {
        loop(filter.call(records[i].addedNodes, elements), true, query);
        loop(filter.call(records[i].removedNodes, elements), false, query);
      }
    }
  };
  const flush = () => {
    callback(observer.takeRecords());
  };
  const loop = (elements, connected, query, set = new Set) => {
    for (let element, i = 0, {length} = elements; i < length; i++) {
      if (!set.has(element = elements[i])) {
        set.add(element);
        for (let m = matches(element), i = 0, {length} = query; i < length; i++) {
          if (m.call(element, query[i]))
            options.handle(element, connected, query[i], i);
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
  return {flush, observer, parse};
};
