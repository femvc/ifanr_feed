'use strict';
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
 * @name 组件
 * @public
 * @author haiyang5210
 * @date 2017-09-27 20:10
 * @param {Object} options 控件初始化参数.
 */
hui.createClass('x-label', {
  isformitem: false,
  childrenChangedCallback: function() {
    this.innerText = this.value

    // Object.defineProperty(this, 'value', {
    //   get: function() {
    //     return this.innerText
    //   },
    //   set: function(newValue) {
    //     // this.setAttribute(':value', newValue)
    //     this.innerText = newValue
    //   }
    // })
    // Object.defineProperty(this, ':value', {
    //   get: function() {
    //     return this.innerText
    //   },
    //   set: function(newValue) {
    //     // this.setAttribute(':value', newValue)
    //     this.innerText = Function('return ' + newValue)()
    //   }
    // })
  },
  // 相当于v0中的attributeChangedCallback,但新增一个可选的observedAttributes属性来约束所监听的属性数目
  attributeChangedCallback: function(attrName, oldVal, newVal) {
    var str = String(attrName).toLowerCase()
    if (str === ':value' || str === 'value') {
      this.value = newVal
    }
  },
  setValue: function(vv) {
    this.innerText = vv
  },
  getValue: function() {
    return this.innerText
  }
})

hui.importCssString('x-label {}')