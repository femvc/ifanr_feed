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
 * @name 组件
 * @public
 * @author haiyang5210
 * @date 2017-09-27 20:10
 * @param {Object} options 控件初始化参数.
 */
hui.createClass('x-input', {
  isformitem: true,
  childrenChangedCallback: function() {
    // console.log('invoked childrenChangedCallback!')
    var type = this.getAttribute('type') || 'text'
    this.innerHTML ='<input type="' + type + '" class="input-elem" />'
    
    var elem = this.querySelector('.input-elem')
    var list = [
      'autocomplete','autofocus','checked','disabled','maxlength','name','pattern','placeholder','readonly','required','size','value','width'
    ] // this.attributes
    for (var i = list.length - 1; i > -1; i--) {
      elem.setAttribute(list[i], list[i].value)
    }
    this.setValue(this.value)
  },
  getValue: function() {
    return this.querySelector('.input-elem').value
  },
  setValue: function(vv) {
    (this.querySelector('.input-elem') || {}).value = vv
  }
})

hui.importCssString([
  'x-input {}',
  'x-input .x-input-elem {}'
].join(''))
