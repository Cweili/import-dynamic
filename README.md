# Import Dynamic

Dynamic import module from url.

## Installation

```shell
npm install import-dynamic
```

## Usage

```js
import importDynamic from 'import-dynamic'

const fn = await importDynamic('https://url-of-module', {
  fetchOptions: { // fetch options
    method: 'GET',
  },
})
fn()
```

**fetch options** An object containing any custom settings that you want to apply to the request. [MDN Links](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters)
