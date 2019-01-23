import React from "react"
import validAttr from "@emotion/is-prop-valid"

const createComponent = (className, modifiers = []) => {
  return ({ as = "div", className: ownClassName, ...otherProps }) => {
    let fullClassName = className
    const propsForElement = {}
    const isTargetTag = isTag(as)

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
  }
}

function block(blockName, modifiers) {
  const block = createComponent(blockName, modifiers)

  const proxy = new Proxy(block, {
    get(target, prop) {
      if (
        [
          "_owner",
          "_source",
          "_store",
          "$$typeof",
          "key",
          "props",
          "ref",
          "type"
        ].indexOf(prop) > -1
      ) {
        return block[prop]
      }

      const elementClassname = `${blockName}__${prop}`

      proxy.getDefaultProps = undefined
      proxy.defaultProps = {}

      return createComponent(elementClassname, modifiers)
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
