import React from "react"
import { findDOMNode } from "react-dom"
import { renderIntoDocument } from "react-dom/test-utils"
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

  it("renders block with non-specified modifier", () => {
    const wrapper = shallow(<Block.Element featured />)
    expect(wrapper.html()).toEqual('<div class="Block__Element"></div>')
  })

  it("should pass the ref to the block component", () => {
    class Wrapper extends React.Component {
      setRef = e => {
        this.componentName = e
      }

      render() {
        return (
          <div>
            <Block ref={this.setRef} />
          </div>
        )
      }
    }

    const wrapper = renderIntoDocument(<Wrapper />)
    const component = findDOMNode(wrapper).querySelector(".Block")
    expect(wrapper.componentName).toBe(component)
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

  it("renders element with custom element separator", () => {
    const TestBlock = block("Block", [], { elementSeparator: "_" })
    const wrapper = shallow(<TestBlock.Element />)
    expect(wrapper.html()).toEqual('<div class="Block_Element"></div>')
  })

  it("renders block with custom modifier separator", () => {
    const TestBlock = block("Block", ["modifier"], { modifierSeparator: "-" })
    const wrapper = shallow(<TestBlock modifier />)
    expect(wrapper.html()).toEqual('<div class="Block Block-modifier"></div>')
  })

  it("renders block with custom modifier value separator", () => {
    const TestBlock = block("Block", ["modifier"], {
      modifierValueSeparator: "--"
    })
    const wrapper = shallow(<TestBlock modifier="value" />)
    expect(wrapper.html()).toEqual(
      '<div class="Block Block--modifier--value"></div>'
    )
  })

  it("renders block with words written in kebab case", () => {
    const TestBlock = block("TestBlock", ["testModifier"], { kebabCase: true })
    const wrapper = shallow(<TestBlock.TestEl testModifier="modifierValue" />)
    expect(wrapper.html()).toEqual(
      '<div class="test-block__test-el test-block__test-el--test-modifier_modifierValue"></div>'
    )
  })
})
