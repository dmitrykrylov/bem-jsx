import React from "react"

import block from "bem-jsx"

const Form = block("Form", ["theme", "simple", "disabled"])

export default function App() {
  return (
    <Form as="form" theme="xmas" simple>
      <Form.Input as="input" type="text" />
      <Form.Submit as="input" type="submit" disabled />
    </Form>
  )
}
