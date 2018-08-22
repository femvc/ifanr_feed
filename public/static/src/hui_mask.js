'use strict'
//   ____             ___          __              ___              
//  /\  __`\     __  /\_ \    __  /\ \        __  /\_ \    __       
//  \ \ \  \ \  /\_\ \//\ \  /\_\ \ \ \      /\_\ \//\ \  /\_\      
//   \ \ \__\ \ \/_/   \ \ \ \/_/  \ \ \____ \/_/   \ \ \ \/_/      
//    \ \  __ <,  /\ˉ\  \ \ \  /\ˉ\ \ \ '___`\ /\ˉ\  \ \ \  /\ˉ\    
//     \ \ \  \ \ \ \ \  \ \ \ \ \ \ \ \ \  \ \\ \ \  \ \ \ \ \ \   
//      \ \ \__\ \ \ \ \  \_\ \_\ \ \ \ \ \__\ \\ \ \  \_\ \_\ \ \  
//       \ \_____/  \ \_\ /\____\\ \_\ \ \_____/ \ \_\ /\____\\ \_\ 
//        \/____/    \/_/ \/____/ \/_/  \/____/   \/_/ \/____/ \/_/ 
//                                                                  

/**
 * @name 页面遮盖控件(全局页面只需要一个遮盖层，所以为单例)
 * @public
 * @author haiyang5210
 * @date 2014-11-15 20:19
 * @param {Object} options 控件初始化参数.
 */
hui.Mask = {
	getId: function() {
		return 'hj001_mask'
	},
	//getStyle: function(){return 'background:#000;opacity:0.25;filter:alpha(opacity=25);width:100%;height:100%;position:absolute;top:0;left:0;z-index:50000';},
	init: function init() {
		var el = document.createElement('div')
		el.id = hui.Mask.getId()
		el.className = 'hj001_mask hide'
		document.body.appendChild(el)
		// el.innerHTML = '<iframe width="100%" height="100%" frameborder="0" src="about:blank" ></iframe>'

		return el
	},
	/**
	 * @name 重新绘制遮盖层的位置
	 * @private
	 * @param {HTMLElement} mask 遮盖层元素.
	 */
	repaintMask: function repaintMask() {
		// var width = Math.max(
		// 		document.documentElement.offsetWidth,
		// 		document.body.offsetWidth
		// 	),
		// 	height = Math.max(
		// 		document.documentElement.offsetHeight,
		// 		document.body.offsetHeight
		// 	)
		// var mask = hui.Mask.getMask()
		// 注：各个浏览器高宽计算不一致，因此需要针对不同浏览器分别处理！
		// if (!window.ActiveXObject) {
		// 	// '>=IE9, FF, Chrome'
		// 	mask.style.width = width + 'px'
		// 	mask.style.height = height + 'px'
		// } else if (!window.XMLHttpRequest) {
		// 	// 'IE6'
		// 	mask.style.width = width - 21 + 'px'
		// 	mask.style.height = height + 'px'
		// } else if (!document.querySelector) {
		// 	// 'IE7'
		// 	mask.style.width = width + 'px'
		// 	mask.style.height = height + 'px'
		// } else if (!document.addEventListener) {
		// 	// 'IE8'
		// 	mask.style.width = width - 21 + 'px'
		// 	mask.style.height = height - 7 + 'px'
		// } else {
		// 	// '>= IE9'
		// 	mask.style.width = width - 18 + 'px'
		// 	mask.style.height = height + 30 + 'px'
		// }

		// mask.style.top = '0px'; //document.body.scrollTop + document.documentElement.scrollTop + 'px'
		// mask.style.left = '0px'; //document.body.scrollLeft + document.documentElement.scrollLeft + 'px'
	},
	/**
	 * @name 页面大小发生变化的事件处理器
	 * @private
	 */
	resizeHandler: function resizeHandler() {
		hui.Mask.repaintMask()
	},
	/**
	 * @name 获取遮盖层dom元素
	 * @private
	 * @return {HTMLElement} 获取到的Mask元素节点.
	 */
	getMask: function getMask() {
		var mask = document.getElementById(hui.Mask.getId())
		if (!mask) {
			mask = hui.Mask.init()
		}
		return mask
	},
	/**
	 * @name 显示遮盖层
	 */
	show: function() {
		var mask = hui.Mask.getMask()
		hui.Mask.repaintMask(mask)
		hui.removeClass(mask, 'hide')

		if (window.addEventListener) {
			window.addEventListener('scroll', hui.Mask.resizeHandler, false)
		} else if (window.attachEvent) {
			window.attachEvent('on' + 'scroll', hui.Mask.resizeHandler)
			//此处使用回调函数call()，让 this指向elem
		}
		/*
		hui.Mask.htmlOverflow = document.documentElement.style.overflow
		document.documentElement.style.overflow = 'hidden'
		hui.Mask.bodyOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		*/
	},
	/**
	 * @name 隐藏遮盖层
	 */
	hide: function(id) {
		hui.addClass(hui.Mask.getMask(), 'hide')

		if (window.removeEventListener) {
			window.removeEventListener('scroll', hui.Mask.resizeHandler, false)
		}
		if (window.detachEvent) {
			window.detachEvent('on' + 'scroll', hui.Mask.resizeHandler)
		}
		/*
		document.documentElement.style.overflow = hui.Mask.htmlOverflow || ''
		document.body.style.overflow = hui.Mask.bodyOverflow || ''
		*/
	}
}

hui.importCssString(
	'/*.ant-modal-mask,*/.hj001_mask{background-color: #8b8b8b;background-image:url(data:image/gif;base64,R0lGODlhAwADAIABAP///////yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS41LWMwMTQgNzkuMTUxNDgxLCAyMDEzLzAzLzEzLTEyOjA5OjE1ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEFBQkJBQjg1QzA0MTFFNEJDNzU5NkUxMUNCNDlFNkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEFBQkJBQjk1QzA0MTFFNEJDNzU5NkUxMUNCNDlFNkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MUI1NjcwOTVCQTQxMUU0QkM3NTk2RTExQ0I0OUU2QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MUI1NjcwQTVCQTQxMUU0QkM3NTk2RTExQ0I0OUU2QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAEAAAEALAAAAAADAAMAAAIEBGKhUQA7);opacity:0.2;filter:alpha(opacity=20);position:fixed;top:0;left:0;bottom:0;right:0;z-index:100}' +
	'.hj001_mask.hide{display: none;}'
)