export const debounce_x = (fn, context = null, timeout = 110)=>{
    clearTimeout(fn.tId)
    fn.tId = setTimeout(() => {
        fn.apply(context, [].slice.call(arguments, 3))
    }, timeout);
}

/**
 * 要使用arguments 无法使用箭头函数
 * 由于es6规定箭头函数无法提供arugments
 * 另： 不建议使用arguments
 */
export const debounce = function (fn, context = null, timeout = 1000) {
    clearTimeout(fn.tId)
    let arr = [].slice.call(arguments, 3)
    fn.tId = setTimeout(() => {
        fn.apply(context, arr)
    }, timeout);
}


export const hasClass = (el, className) => {
	if (!el)  return false
	let oldClassName = el.getAttribute('class') || ''
	if (!oldClassName || !oldClassName.includes(className)) {
		return false
	}
	return true
}


export const addClass = (el, className) =>{
    if (!el)  return
    let oldClassName = el.getAttribute('class') || ''
    if(!oldClassName.includes(className)){
        oldClassName = oldClassName.concat(' ' + className);
    }
    el.setAttribute('class',oldClassName);
}
export const removeClass = (el, className) =>{
    if (!el)  return
    let oldClassName = el.getAttribute('class') || ''
    oldClassName = oldClassName.replace(className + ' ', '')
    oldClassName = oldClassName.replace(' ' + className, '')
    oldClassName =  oldClassName.replace(className, '')
    el.setAttribute('class',oldClassName);
}


/**
 * 首尾调用两次，其他不掉用，调用方式跟上面的debounce一样
 */
const _debounce = function (func, wait, immediate) {
	var timeout, args, context, timestamp, result
	
	var later = function () {
		var last = new Date().getTime() - timestamp
		if (last < wait && last >= 0) {
			timeout = setTimeout(later , wait - last);
		}else {
			timeout = null
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) {
					context = args = null
				}
			}
		}
	}

	return function () {
		context = this
		args = arguments
		timestamp = new Date().getTime()

		var callNow = immediate && !timeout
		if (!timeout) {
			timeout = setTimeout(later, wait)
		}
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}
		return result
	}
}

