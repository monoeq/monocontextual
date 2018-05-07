var html = require('nanohtml')
var Nanocomponent = require('nanocomponent')
var inlineStyle = require('inline-style')

module.exports = class MonoContextual extends Nanocomponent {
  constructor () {
    super()

    this.handleResize = throttle(() => this.rerender(), 100)
  }

  load (element) {
    if (this.props.disabled) return
    this.rerender()
    window.addEventListener('resize', this.handleResize)
  }

  unload () {
    window.removeEventListener('resize', this.handleResize)
  }

  getInnerDimensions (element) {
    var dimensions = {}
    var styles = getComputedStyle(element)
    dimensions.width = element.clientWidth
      - parseFloat(styles.paddingLeft)
      - parseFloat(styles.paddingRight)
    dimensions.height = element.clientHeight
      - parseFloat(styles.paddingTop)
      - parseFloat(styles.paddingBottom)
    dimensions.ratio = (dimensions.height / dimensions.width) * 100
    return dimensions
  }

  // 1. get parent dimensions
  // 2. check width or height basis
  // 3. return inline styles
  inlineStyles () {
    if (this.props.disabled) return 'width:100%'
    if (this.element) {
      this.element.removeAttribute('style')
      var parent = this.element.parentNode
      var parentD = this.getInnerDimensions(parent)

      var styles = {}
      if (parentD.ratio > this.props.ratio) {
        styles.width = parentD.width + 'px'
        var elHeight = parentD.width * (this.props.ratio / 100)
        styles.height = elHeight + 'px'
        styles.marginTop = (parentD.height - elHeight) / 2  + 'px'
      } else {
        styles.height = parentD.height + 'px'
        var elWidth = parentD.height / (this.props.ratio / 100)
        styles.width = elWidth + 'px'
        styles.marginLeft = (parentD.width - elWidth) / 2 + 'px'
      }

      return inlineStyle(styles)
    }
  }

  update () {
    return true
  }

  createElement (props, children) {
    this.props = props
    return html`<div style="${this.inlineStyles()}">${children}</div>`
  }
}

function throttle(fn, timeout) {
  var timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(function() {
        fn()
        timer = null
      }, timeout)
    }
  }
}
