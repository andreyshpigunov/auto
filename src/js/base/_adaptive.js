//
//	_adaptive.js | Vanilla JS
//	Адаптивность
//
//	Copyright © 2020 Andrey Shpigunov. All right reserved.
//


// if(adaptive.small){ ... } - 720 и меньше и т. д.


export const breakpoints = {
  xsmall: 420,
  small: 720,
  medium: 1080,
  large: 1440
}

export function xsmall() {
  return window.innerWidth <= breakpoints.xsmall
}

export function small() {
  return window.innerWidth <= breakpoints.small
}

export function medium() {
  return window.innerWidth <= breakpoints.medium
}

export function large() {
  return window.innerWidth <= breakpoints.large
}

export function xlarge() {
  return window.innerWidth > breakpoints.large
}

