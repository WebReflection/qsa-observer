self.qsaObserver = (function (exports) {
  'use strict';

  /*! (c) Andrea Giammarchi - ISC */
  const TRUE = true, FALSE = false, QSA$1 = 'querySelectorAll';

  /**
   * Start observing a generic document or root element.
   * @param {(node:Element, connected:boolean) => void} callback triggered per each dis/connected element
   * @param {Document|Element} [root=document] by default, the global document to observe
   * @param {Function} [MO=MutationObserver] by default, the global MutationObserver
   * @param {string[]} [query=['*']] the selectors to use within nodes
   * @returns {MutationObserver}
   */
  const notify = (callback, root = document, MO = MutationObserver, query = ['*']) => {
    const loop = (nodes, selectors, added, removed, connected, pass) => {
      for (const node of nodes) {
        if (pass || (QSA$1 in node)) {
          if (connected) {
            if (!added.has(node)) {
              added.add(node);
              removed.delete(node);
              callback(node, connected);
            }
          }
          else if (!removed.has(node)) {
            removed.add(node);
            added.delete(node);
            callback(node, connected);
          }
          if (!pass)
            loop(node[QSA$1](selectors), selectors, added, removed, connected, TRUE);
        }
      }
    };

    const mo = new MO(records => {
      if (query.length) {
        const selectors = query.join(',');
        const added = new Set, removed = new Set;
        for (const {addedNodes, removedNodes} of records) {
          loop(removedNodes, selectors, added, removed, FALSE, FALSE);
          loop(addedNodes, selectors, added, removed, TRUE, FALSE);
        }
      }
    });

    const {observe} = mo;
    (mo.observe = node => observe.call(mo, node, {subtree: TRUE, childList: TRUE}))(root);

    return mo;
  };

  const QSA = 'querySelectorAll';

  const {document: document$1, Element, MutationObserver: MutationObserver$1, Set: Set$1, WeakMap} = self;

  const elements = element => QSA in element;
  const {filter} = [];

  var index = options => {
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
              live.set(element, new Set$1);
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
    const root = options.root || document$1;
    const observer = notify(notifier, root, MutationObserver$1, query);
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

  exports["default"] = index;

  return exports;

})({}).default;
