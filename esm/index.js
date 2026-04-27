import { ShadowObserver } from 'shadow-observer';
import { notify } from 'element-notifier';

/**
 * @typedef {object} QSAObserverOptions
 * @property {string[]} query Selectors passed to `querySelectorAll` on the root (and within added nodes).
 * @property {Document | Element} [root] Node to observe with subtree + childList; defaults to the global `document`.
 * @property {(element: Element, connected: boolean, selector: string) => void} handle
 *   Invoked once per matching selector when an element becomes connected, and once per tracked selector when it disconnects.
 */

/**
 * @typedef {object} QSAObserverResult
 * @property {(elements: ArrayLike<Element>) => void} drop Forget live tracking for the given elements (no `handle` calls).
 * @property {() => void} flush Drain the observer queue synchronously via `takeRecords()` and apply connect/disconnect logic.
 * @property {MutationObserver} observer Underlying `MutationObserver` returned by `element-notifier`'s `notify`.
 * @property {(elements: ArrayLike<Element>, connected?: boolean) => void} parse
 *   Run the same notifier logic as for observed mutations; `connected` defaults to `true`.
 */

const { document, Element, Set, WeakMap } = self;
const { defineProperty } = Object;
const { filter } = Array.prototype;

const elements = element => 'querySelectorAll' in element;

/**
 * Watch `root` for nodes matching `query` and report lifecycle per selector through `handle`.
 * When `Element.prototype.attachShadow` exists, shadow roots created after this call are observed too.
 *
 * @param {QSAObserverOptions} options
 * @returns {QSAObserverResult}
 */
export default options => {

  const live = new WeakMap;

  const drop = elements => {
    for (let i = 0; i < elements.length; i++)
      live.delete(elements[i]);
  };

  const flush = () => {
    const records = observer.takeRecords();
    for (let i = 0; i < records.length; i++) {
      parse(filter.call(records[i].removedNodes, elements), false);
      parse(filter.call(records[i].addedNodes, elements), true);
    }
  };

  const notifier = (element, connected) => {
    if (element instanceof ShadowRoot) return;
    let selectors;
    if (connected) {
      for (let q, i = 0; i < query.length; i++) {
        if (element.matches(q = query[i])) {
          selectors = live.get(element);
          if (!selectors)
            live.set(element, (selectors = new Set));
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
    for (let i = 0; i < elements.length; i++)
      notifier(elements[i], connected);
  };

  const query = options.query;
  const root = options.root || document;

  const observer = notify(notifier, root, ShadowObserver, query);

  if (query.length) {
    parse(root.querySelectorAll(query));
  }

  return { drop, flush, observer, parse };
};
