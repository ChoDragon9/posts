module.exports = {
  getRadian: function (angle) {
    return angle * (Math.PI / 180)
  },
  getSine: function (num) {
    return Math.sin(this.getRadian(num))
  },
  getCosine: function (num) {
    return Math.cos(this.getRadian(num))
  },
  pythagoreanTheorem: function (x1, y1, x2, y2) {
    var xLength = Math.abs(x1 - x2)
    var yLength = Math.abs(y1 - y2)
    /**
     * It is Pythagorean theorem.
     * Math.pow(a, 2) + Math.pow(b, 2) = Math.pow(c, 2)
     */
    var lineLength = Math.sqrt(
      Math.pow(xLength, 2) + Math.pow(yLength, 2)
    )

    return lineLength
  },
  getAngle: function (x1, y1, x2, y2) {
    var xLength = x1 - x2
    var yLength = y1 - y2
    var angle = Math.atan2(xLength, yLength)

    angle *= 180 / Math.PI
    angle *= -1

    return angle
  },
  getVertextAngle: function (a, b, c) {
    var ab = [
      b[0] - a[0],
      b[1] - a[1]
    ]
    var cb = [
      b[0] - c[0],
      b[1] - c[1]
    ]
    var dot = (ab[0] * cb[0] + ab[1] * cb[1]) // dot product
    var cross = (ab[0] * cb[1] - ab[1] * cb[0]) // cross product
    var alpha = Math.atan2(cross, dot)
    return alpha * 180 / Math.PI
  },
  checkLineIntersection: function (line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    var returnVal = true
    var denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY))

    if (denominator === 0) {
      return returnVal
    }
    var a = line1StartY - line2StartY
    var b = line1StartX - line2StartX
    var numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b)
    var numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b)
    a = numerator1 / denominator
    b = numerator2 / denominator
    /*
    // it is worth noting that this should be the same as:
    x = line2StartX + (b * (line2EndX - line2StartX));
    y = line2StartX + (b * (line2EndY - line2StartY));
    */
    // if line1 is a segment and line2 is infinite, they intersect if:
    // if line2 is a segment and line1 is infinite, they intersect if:
    if ((a > 0 && a < 1) && (b > 0 && b < 1)) {
      returnVal = false
    }
    return returnVal
  },
  getLineCenter: function (x1, y1, x2, y2) {
    var longX = 0
    var shortX = 0
    var longY = 0
    var shortY = 0
    var centerX = 0
    var centerY = 0

    if (x1 > x2) {
      longX = x1
      shortX = x2
    } else {
      longX = x2
      shortX = x1
    }

    if (y1 > y2) {
      longY = y1
      shortY = y2
    } else {
      longY = y2
      shortY = y1
    }

    centerX = (longX - shortX) / 2 + shortX
    centerY = (longY - shortY) / 2 + shortY

    return [centerX, centerY]
  }
}
