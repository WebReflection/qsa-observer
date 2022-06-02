import {notify} from 'element-notifier';

const QSA = 'querySelectorAll';

const {document, Element, MutationObserver, Set, WeakMap} = self;

const elements = element => QSA in element;
const {filter} = [];

export default options => {
  const live = new WeakMap;
  const drop = elements => {
    for (let i = 0, {length} = elements; i < length; i++)
      live.delete(elements[i]);
  };
  const flush = () => {
    const records = observer.takeRecords();
    for (let i = 0, {length} = records; i < length; i++) {
      parse(filter.call(records[i].removedNodes, elements), false);
      parse(filter.call(records[i].addedNodes, elements), true);
    }
  };
  const matches = element => (
    element.matches ||
    element.webkitMatchesSelector ||
    element.msMatchesSelector
  );
  const notifier = (element, connected) => {
    let selectors;
    if (connected) {
      for (let q, m = matches(element), i = 0, {length} = query; i < length; i++) {
        if (m.call(element, q = query[i])) {
          if (!live.has(element))
            live.set(element, new Set);
          selectors = live.get(element);
          if (!selectors.has(q)) {
            selectors.add(q);
            options.handle(element, connected, q);
          }
        }
      }
    }
    else if (live.has(element)) {
      selectors = live.get(element);
      live.delete(element);
      selectors.forEach(q => {
        options.handle(element, connected, q);
      });
    }
  };
  const parse = (elements, connected = true) => {
    for (let i = 0, {length} = elements; i < length; i++)
      notifier(elements[i], connected);
  };
  const {query} = options;
  const root = options.root || document;
  const observer = notify(notifier, root, MutationObserver, query);
  const {attachShadow} = Element.prototype;
  if (attachShadow)
    Element.prototype.attachShadow = function (init) {
      const shadowRoot = attachShadow.call(this, init);
      observer.observe(shadowRoot);
      return shadowRoot;
    };
  if (query.length)
    parse(root[QSA](query));
  return {drop, flush, observer, parse};
};
