# qsa-observer

Given an array of selectors, handles any matching element that was wither connected, or disconnected, from an observed element, or document.


### Differently from MutationObserver

  * each element is granted to be handled, whenever it's observed via one, or more, selectors
  * all observed elements will pass through `handle(element, selector)` utility, per each matching selector
  * elements injected through `innerHTML`, or created offline, will be handled too once live


### Example

```js
import QSAO from 'qsa-observer';

// an Array of CSS selectors to observe
const query = ['div'];

// where to observe mutations, document by default
const root = document;

const {
  flush,    // an utility to flush synchronously all queued mutations
  observer, // the MutationObserver created by QSAO(...)
  parse     // an utility to parse new elements
            // (i.e. after adding a selector to the query list)
} = QSAO({
  query,  // list of selectors to observe
  root,   // optional, as it's document by default

  // the method that receives all elements that match one or more
  // selectors in the query, and are either connected or disconnected
  handle(element, connected, selector, index) {
    const event = connected ? 'connected' : 'disconnected';
    console.log(element, event, selector, index);
  }
});

// example: add another selector to observe and passes through the setup
const observeMore = selector => {
  if (!query.includes(selector)) {
    query.push(selector);
    parse(root.querySelectorAll(selector));
  }
};

// example: watch 'p' nodes too after a second
setTimeout(observeMore, 1000, 'p');
```