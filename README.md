# qsa-observer

![bird watch](./qsa-observer-head.jpg)

<sup>**Social Media Photo by [Kevin Maillefer](https://unsplash.com/@kmaillefer) on [Unsplash](https://unsplash.com/)**</sup>


Given an array of selectors, handles any matching element that was either connected, or disconnected, from an observed element, or document.


### Differently from MutationObserver

  * each element is granted to be handled, whenever it's observed via one, or more, selectors
  * all observed elements will pass through `handle(element, connected, selector)` utility, per each matching selector
  * elements injected through `innerHTML`, or created offline, will be handled too once live


### Example

```js
import QSAO from 'qsa-observer';

// an Array of CSS selectors to observe
const query = ['div'];

// where to observe mutations, document by default
const root = document;

const {
  drop,     // an utility to drop a list of elements from being considered live
  flush,    // an utility to flush synchronously all queued mutations
  observer, // the MutationObserver created by QSAO(...)
  parse     // an utility to parse new elements
            // (i.e. after adding a selector to the query list)
} = QSAO({
  query,  // list of selectors to observe
  root,   // optional, as it's document by default

  // the method that receives all elements that match one or more
  // selectors in the query, and are either connected or disconnected
  handle(element, connected, selector) {
    const event = connected ? 'connected' : 'disconnected';
    console.log(element, event, selector);
  }
});

// example: add another selector to observe and pass through the handle
const observeMore = selector => {
  if (!query.includes(selector)) {
    query.push(selector);
    parse(root.querySelectorAll(selector));
  }
};

// example: watch 'p' nodes too after a second
setTimeout(observeMore, 1000, 'p');
```


### Libraries based on qsa-observer

  * [custom-elements-ie](https://github.com/WebReflection/custom-elements-ie#readme)
  * [custom-elements-builtin](https://github.com/WebReflection/custom-elements-builtin#readme)
  * [as-custom-element](https://github.com/WebReflection/as-custom-element#readme)
  * [wicked-elements](https://github.com/WebReflection/wicked-elements#readme)
  * [hooked-elements](https://github.com/WebReflection/hooked-elements#readme)
