import React, { Component } from "react"

import block from "bem-jsx"

const Form = block("Form", ["theme", "simple", "disabled"])

export default class App extends Component {
  render() {
    return (
      <Form as="form" theme="xmas" simple>
        <Form.Input as="input" type="text" />
        <Form.Input as="input" type="submit" disabled />
      </Form>
    )
  }
}
