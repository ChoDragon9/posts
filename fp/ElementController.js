/**
 * DOM 조작 객체
 */
const _ = require('./fp')

module.exports = {
  setAttr (attrName, val, ns) {
    !!ns && (ns = null)
    return (element) => {
      element.setAttributeNS(ns, attrName, val)
      return element
    }
  },
  getAttr: (attrName) => (element) => element.getAttributeNS(null, attrName),
  setHrefAttr: function (val) {
    return this.setAttr('href', val, 'http://www.w3.org/1999/xlink')
  },
  removeChild: function (parentElement, childrenElement) {
    parentElement.removeChild(childrenElement)
  },
  appendChild: function (parentElement, childrenElement) {
    parentElement.appendChild(childrenElement)
  },
  style (name, value) {
    return elem => {
      elem.style[name] = value
      return elem
    }
  },
  createSVGElement: function (name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name)
  },
  createLine: function (strokeWidth) {
    return _.pipe(
      this.createSVGElement,
      _.divEq(
        this.setAttr('stroke-width', strokeWidth),
        this.setAttr('draggable', false)
      )
    )('line')
  },
  createCircle: function (circleRadius) {
    return _.pipe(
      this.createSVGElement,
      _.divEq(
        this.setAttr('r', circleRadius),
        this.setAttr('draggable', false)
      )
    )('circle')
  },
  createRect: function (width, height) {
    return _.pipe(
      this.createSVGElement,
      _.divEq(
        this.setAttr('width', width),
        this.setAttr('height', height),
        this.setAttr('draggable', false)
      )
    )('rect')
  },
  createText: function (txt) {
    return _.pipe(
      this.createSVGElement,
      this.setAttr('draggable', false),
      (text) => {
        text.textContent = txt
        return text
      }
    )('text')
  },
  createGroup: function () {
    return this.createSVGElement('g')
  },
  createImage: function (imagePath, width, height) {
    var imageContainner = this.createGroup()
    var image = _.pipe(
      this.createSVGElement,
      _.divEq(
        this.setHrefAttr(imagePath),
        this.setAttr('width', width),
        this.setAttr('height', height),
        this.setAttr('draggable', false)
      )
    )('image')

    imageContainner.appendChild(image)

    return [image, imageContainner]
  },
  createPolygon: function () {
    return _.pipe(
      this.createSVGElement,
      this.setAttr('draggable', false)
    )('polygon')
  },
  createUse: function () {
    return this.createSVGElement('use')
  },
  getBodyScroll: function () {
    var scroll = false
    var body = document.body
    var html = document.documentElement

    if (body.scrollTop !== 0 || body.scrollLeft !== 0) {
      // For Chrome, Safari, Opera
      scroll = {
        left: body.scrollLeft,
        top: body.scrollTop
      }
    } else if (html.scrollTop !== 0 || html.scrollLeft !== 0) {
      // Firefox, IE
      scroll = {
        left: html.scrollLeft,
        top: html.scrollTop
      }
    }

    return scroll
  },
  getSVGOffset (target) {
    return () => {
      const {
        top, left, width, height
      } = target.getBoundingClientRect()

      return {
        top, left, width, height
      }
    }
  },
  getPageAxis (element, event) {
    return _.pipe(
      this.getSVGOffset(element),
      ({left, top}) => {
        return [
          event.pageX - left,
          event.pageY - top
        ]
      },
      ([xAxis, yAxis]) => {
        const scroll = this.getBodyScroll()

        if (scroll) {
          xAxis -= scroll.left
          yAxis -= scroll.top
        }

        return [xAxis, yAxis]
      }
    )()
  },
  getSize (element) {
    const width = _.pipe(
      this.getAttr('width'),
      (width) => {
        return width || element.clientWidth
      },
      parseInt
    )(element)

    const height = _.pipe(
      this.getAttr('height'),
      (height) => {
        return height || element.clientHeight
      },
      parseInt
    )(element)

    return { width, height }
  }
}
