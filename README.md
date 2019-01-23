# bem-jsx

> Integrate BEM into your React app gracefully

[![NPM](https://img.shields.io/npm/v/bem-jsx.svg)](https://www.npmjs.com/package/bem-jsx) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bem-jsx
```

## Usage

```jsx
import React, { Component } from "react"
import block from "bem-jsx"

const Form = block("Form", ["theme", "simple", "disabled"])

class Example extends Component {
  render() {
    return (
      <Form as="form" theme="xmas" simple>
        <Form.Input as="input" type="text" />
        <Form.Input as="input" type="submit" disabled />
      </Form>
    )
  }
}
```

It will produce the following piece of HTML:

```html
<form class="Form Form--theme_xmas Form--simple">
  <input type="text" class="Form__Input" />
  <input type="submit" disabled class="Form__Input Form__Input--disabled" />
</form>
```

## Reference

`block` function takes 2 arguments:

- `blockClassName` : **string**, required
- `modifiers` : **Array\<string\>**, optional

## License

MIT © [dmitrykrylov](https://github.com/dmitrykrylov)
