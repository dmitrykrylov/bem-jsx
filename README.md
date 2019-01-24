# bem-jsx

> Integrate BEM into your React app gracefully

[![NPM](https://img.shields.io/npm/v/bem-jsx.svg)](https://www.npmjs.com/package/bem-jsx) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bem-jsx
```

## Usage

```jsx
import React from "react"
import block from "bem-jsx"

const Form = block("Form", ["theme", "simple", "disabled"])

const Example = () => (
  <Form as="form" theme="xmas" simple>
    <Form.Input as="input" type="text" />
    <Form.Submit as="input" type="submit" disabled />
  </Form>
)
```

It will produce the following piece of HTML:

```html
<form class="Form Form--theme_xmas Form--simple">
  <input type="text" class="Form__Input" />
  <input type="submit" disabled class="Form__Submit Form__Submit--disabled" />
</form>
```

## Reference

`block` function takes 2 arguments:

- `blockClassName` : **string**, required
- `modifiers` : **Array\<string\>**, optional

Let's create a Block. It can do a lot!

```js
const Block = block("Block", ["theme", "simple", "disabled"])
```

<table>
<tr>
<th>
</th>
<th>
React JSX
</th>
<th>
HTML produced
</th>
</tr>
<tr>
<td>
Block
</td>
<td>

```js
<Block />
```

</td>
<td>

```html
<div class="Block"></div>
```

</td>
</tr>
<tr>
<td>
With tag specified
</td>
<td>

```js
<Block as="span" />
```

</td>
<td>

```html
<span class="Block"></span>
```

</td>
</tr>
<tr>
<td>
Element
</td>
<td>

```js
<Block.Element />
```

</td>
<td>

```html
<div class="Block__Element"></div>
```

</td>
</tr>
<tr>
<td>
Everything can be an element!
</td>
<td>

```js
<Block.MillaJovovich />
```

</td>
<td>

```html
<div class="Block__MillaJovovich"></div>
```

</td>
</tr>
<tr>
<td>
Boolean modifier
</td>
<td>

```js
<Block simple />
```

</td>
<td>

```html
<div class="Block Block--simple"></div>
```

</td>
</tr>
<tr>
<td>
Non-boolean modifier
</td>
<td>

```js
<Block theme="dark" />
```

</td>
<td>

```html
<div class="Block Block--theme_dark"></div>
```

</td>
</tr>
<!-- <tr>
<td>
If a modifier prop is a valid HTML attribute, it will be passed down
</td>
<td>

```js
<Block as="button" disabled>Ok<Block>
```

</td>
<td>

```html
<button class="Block" disabled>Ok</button>
```

</td>
</tr> -->
</table>

## License

MIT © [dmitrykrylov](https://github.com/dmitrykrylov)
