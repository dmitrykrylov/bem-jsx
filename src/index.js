import React from "react"
import validAttr from "@emotion/is-prop-valid"

const createComponent = (className, modifiers = []) => {
  return React.forwardRef((props, ref) => {
    const { as = "div", className: ownClassName, ...otherProps } = props
    const propsForElement = { ref }
    const isTargetTag = isTag(as)

    let fullClassName = className
    let key

    for (key in otherProps) {
      if (key === "forwardedComponent" || key === "as") continue
      else if (key === "forwardedRef") propsForElement.ref = otherProps[key]
      else if (!isTargetTag || validAttr(key)) {
        // Don't pass through non HTML tags through to HTML elements
        propsForElement[key] = otherProps[key]
      }

      if (modifiers.indexOf(key) > -1) {
        fullClassName += " "
        if (typeof otherProps[key] === "boolean") {
          if (otherProps[key]) {
            fullClassName += `${className}--${key}`
          }
        } else {
          fullClassName += `${className}--${key}_${otherProps[key]}`
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

function block(blockName, modifiers) {
  const block = createComponent(blockName, modifiers)
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
        const elementClassname = `${blockName}__${prop}`
        elements[prop] = createComponent(elementClassname, modifiers)
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

export default block
