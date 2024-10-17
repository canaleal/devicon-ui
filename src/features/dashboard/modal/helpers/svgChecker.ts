// Viewbox not 128 x 128
// If plain, plain-wordmark, line, line-wordmark only 1 fill color and 1 path
// if original, original-wordmark has 1 path and 1 fill color it can be used as alias for plain, plain-wordmark, line, line-wordmark
// Icon.color cannot be found in the svg fill color

import { IIcon } from '../../../../types'

interface IError {
  title: string
  message: string
}

const isViewBox128x128 = (svg: string) => {
  return svg.includes('viewBox="0 0 128 128"')
}

const hasMoreThanOneFillColor = (svg: string) => {
  const fillColor = svg.match(/fill="#[a-zA-Z0-9]{6}"/g)
  return fillColor && fillColor.length > 1
}

const hasMoreThanOnePath = (svg: string) => {
  const path = svg.match(/<path/g)
  return path && path.length > 1
}

const iconColorNotInSVG = (icon: IIcon, svg: string) => {
  return !svg.includes(icon.color)
}

export const getSVGErrors = (icon: IIcon, svg: string) => {
  const errors: IError[] = []

  if (!isViewBox128x128(svg)) {
    errors.push({
      title: 'ViewBox not 128 x 128',
      message: 'The viewBox attribute is not set to "0 0 128 128"'
    })
  }

  if (hasMoreThanOneFillColor(svg)) {
    errors.push({
      title: 'More than one fill color',
      message:
        'The SVG has more than one fill color. Only one fill color is allowed for plain, plain-wordmark, line, line-wordmark'
    })
  }

  if (hasMoreThanOnePath(svg)) {
    errors.push({
      title: 'More than one path',
      message: 'The SVG has more than one path'
    })
  }

  if (icon.versions.svg.includes('original') || icon.versions.svg.includes('original-wordmark')) {
    if (iconColorNotInSVG(icon, svg)) {
      errors.push({
        title: 'Color not found in SVG',
        message: 'The color defined in the icon object is not found in the SVG'
      })
    }
  }

  return errors
}
