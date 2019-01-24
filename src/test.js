import React from "react"
import { shallow } from "enzyme"
import block from "./index"

describe("without modifiers", () => {
  const Block = block("Block")

  it("renders block without crashing", () => {
    shallow(<Block />)
  })

  it("renders element without crashing", () => {
    shallow(<Block.Element />)
  })

  it("renders block with class", () => {
    const wrapper = shallow(<Block />)
    expect(wrapper.html()).toEqual('<div class="Block"></div>')
  })

  it("renders element with class", () => {
    const wrapper = shallow(<Block.Element />)
    expect(wrapper.html()).toEqual('<div class="Block__Element"></div>')
  })

  it("renders block with tag", () => {
    const wrapper = shallow(<Block as="span" />)
    expect(wrapper.html()).toEqual('<span class="Block"></span>')
  })

  it("renders element with tag", () => {
    const wrapper = shallow(<Block.Element as="span" />)
    expect(wrapper.html()).toEqual('<span class="Block__Element"></span>')
  })

  it("renders element with class", () => {
    const wrapper = shallow(<Block.Element />)
    expect(wrapper.html()).toEqual('<div class="Block__Element"></div>')
  })

  it("renders block with modifier", () => {
    const wrapper = shallow(<Block.Element />)
    expect(wrapper.html()).toEqual('<div class="Block__Element"></div>')
  })
})

describe("without modifiers", () => {
  const Block = block("Block", ["theme", "featured"])

  it("renders block with non-boolean modifier", () => {
    const wrapper = shallow(<Block theme="xmas" />)
    expect(wrapper.html()).toEqual(
      '<div class="Block Block--theme_xmas"></div>'
    )
  })

  it("renders block with boolean modifier", () => {
    const wrapper = shallow(<Block featured />)
    expect(wrapper.html()).toEqual('<div class="Block Block--featured"></div>')
  })

  it("renders block with non-boolean modifier", () => {
    const wrapper = shallow(<Block.Element theme="xmas" />)
    expect(wrapper.html()).toEqual(
      '<div class="Block__Element Block__Element--theme_xmas"></div>'
    )
  })

  it("renders element with boolean modifier", () => {
    const wrapper = shallow(<Block.Element featured />)
    expect(wrapper.html()).toEqual(
      '<div class="Block__Element Block__Element--featured"></div>'
    )
  })
})
