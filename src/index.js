import React from "react"
import validAttr from "@emotion/is-prop-valid"

const createComponent = (
  blockClassName,
  elementClassName,
  modifiers = [],
  config = {}
) => {
  return React.forwardRef((props, ref) => {
    const {
      elementSeparator = "__",
      modifierSeparator = "--",
      modifierValueSeparator = "_",
      kebabCase = false
    } = config

    const format = kebabCase ? camelToKebab : str => str

    const { as = "div", className: ownClassName, ...otherProps } = props

    const propsForElement = { ref }

    const isTargetTag = isTag(as)

    let baseClassName = format(blockClassName)

    if (elementClassName) {
      baseClassName += `${elementSeparator}${format(elementClassName)}`
    }

    let fullClassName = baseClassName

    let key

    for (key in otherProps) {
      if (key === "forwardedComponent" || key === "as") continue
      else if (key === "forwardedRef") propsForElement.ref = otherProps[key]
      else if (!isTargetTag || validAttr(key)) {
        // Don't pass through non HTML tags through to HTML elements
        propsForElement[key] = otherProps[key]
      }

      if (modifiers.indexOf(key) > -1) {
        const mofifier = format(key)

        if (typeof otherProps[key] === "boolean") {
          if (otherProps[key]) {
            fullClassName += " "
            fullClassName += `${baseClassName}${modifierSeparator}${mofifier}`
          }
        } else {
          const value = otherProps[key]
          fullClassName += " "
          fullClassName += `${baseClassName}${modifierSeparator}${mofifier}${modifierValueSeparator}${value}`
        }
      }
    }

    if (ownClassName) {
      fullClassName += " "
      fullClassName += ownClassName
    }

    propsForElement.className = fullClassName

    return React.createElement(as, propsForElement)
  })
}

function block(blockName, modifiers, config = {}) {
  const block = createComponent(blockName, null, modifiers, config)
  const elements = {}

  const reactElementOwnProperties = [
    "__reactAutoBindPairs",
    "_owner",
    "_self",
    "_source",
    "_store",
    "$$typeof",
    "apply",
    "defaultProps",
    "childContextTypes",
    "displayName",
    "getDefaultProps",
    "getDerivedStateFromProps",
    "key",
    "name",
    "props",
    "propTypes",
    "PropTypes",
    "prototype",
    "ref",
    "render",
    "tag",
    "type"
  ]

  const proxy = new Proxy(block, {
    get(target, prop) {
      if (reactElementOwnProperties.indexOf(prop) > -1) {
        return target[prop]
      }

      if (prop in elements) {
        return elements[prop]
      } else {
        elements[prop] = createComponent(blockName, prop, modifiers, config)
        return elements[prop]
      }
    }
  })

  return proxy
}

function isTag(target) {
  return (
    typeof target === "string" &&
    (process.env.NODE_ENV !== "production"
      ? target.charAt(0) === target.charAt(0).toLowerCase()
      : true)
  )
}

function camelToKebab(string) {
  return string.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

export default block
