declare function _default(options: QSAObserverOptions): QSAObserverResult;
export default _default;
export type QSAObserverOptions = {
    /**
     * Selectors passed to `querySelectorAll` on the root (and within added nodes).
     */
    query: string[];
    /**
     * Node to observe with subtree + childList; defaults to the global `document`.
     */
    root?: Document | Element;
    /**
     *   Invoked once per matching selector when an element becomes connected, and once per tracked selector when it disconnects.
     */
    handle: (element: Element, connected: boolean, selector: string) => void;
};
export type QSAObserverResult = {
    /**
     * Forget live tracking for the given elements (no `handle` calls).
     */
    drop: (elements: ArrayLike<Element>) => void;
    /**
     * Drain the observer queue synchronously via `takeRecords()` and apply connect/disconnect logic.
     */
    flush: () => void;
    /**
     * Underlying `ShadowObserver` returned by `element-notifier`'s `notify`.
     */
    observer: ShadowObserver;
    /**
     *   Run the same notifier logic as for observed mutations; `connected` defaults to `true`.
     */
    parse: (elements: ArrayLike<Element>, connected?: boolean) => void;
};
import { ShadowObserver } from 'shadow-observer';
