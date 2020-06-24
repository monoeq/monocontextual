<h1 align="center">monocontextual</h1>

<div align="center">
  <a href="https://nodejs.org/api/documentation.html#documentation_stability_index">
    <img src="https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square" alt="Stability" />
  </a>
  <a href="https://www.npmjs.com/package/monocontextual">
    <img src="https://img.shields.io/npm/v/monocontextual.svg?style=flat-square" alt="NPM version" />
  </a>
</div>

<br />

**work in progress...**

Context aware aspect ratio [nanocomponent](https://github.com/choojs/nanocomponent) container.

## Usage

```js
var MonoContextual = require('monocontextual')

var monocon = new MonoContextual()
var child = document.createElement('div')
var element = monocon.render({ ratio: 75 }, child)
```

## Details

`monocontextual` looks at the dimensions of it's parent and sizes itself to always fit within it while maintaining the correct aspect ratio. Typically you can (and should) just use [intrinsic ratio containers](https://css-tricks.com/aspect-ratio-boxes/), but sometimes you need an aspect ratio container which can also be limited by height.

---

`monocontextual` is meant as a container component, you should always pass a child element, (you'll usually want this child element to have 100% width and height).

---

`monocontextual` has an escape hatch for disabling it's functionality. This is particularly useful when you only need a contextual container at a certain browser width:

```js
var element = monocon.render({
  ratio: 75,
  disabled: window.width <= 1024
}, child)
```

## Todo

- [ ] Asserts
- [ ] Better docs?

## See Also

- [choojs/nanocomponent](https://github.com/choojs/nanocomponent)
- [monoeq/monolazy](https://github.com/monoeq/monolazy)
- [monoeq/monoimage](https://github.com/monoeq/monoimage)