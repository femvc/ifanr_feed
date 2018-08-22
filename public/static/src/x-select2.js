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
 * @param {Object} args 控件初始化参数.
 */
hui.createClass('x-select2', {
  'x-select2': function(args, pending, opt_propMap) {
    window['x-tag'].call(this, args, 'pending')
    this.isformitem = args.isformitem === undefined ? true : false
    this.tagName = 'x-select2'

    // 进入控件处理主流程!
    if (pending != 'pending') {
      this.enterControl(opt_propMap)
    }
  },
  render: function(opt_propMap) {
    hui.Control.prototype.render.call(this, opt_propMap)
    var me = this
    // 渲染对话框
    // hui.Control.initChildControl(me.getMain(), {}, opt_propMap)
    this.childrenChangedCallback()
  },
  isformitem: true,
  getTpl: function() {
    var tpl = [
      '{{for: id1,item1 in it}}',
      '<li class="select2-results-dept-0 select2-result {{if:item1.child}} select2-result-with-children {{/if}}">',
      '  <div {{if:item1.disabled}} disabled="disabled"{{/if}} {{if:(!item1.child&&item1.unselectable)||(item1.child&&!item1.selectable)}} unselectable="unselectable"{{/if}} value="{{item1.value}}" class="select2-result-label">',
      '    <span class="select2-match"></span>{{item1.text|decodeURI}}',
      '  </div>',
      '  {{if:item1.child}}',
      '  <ul class="select2-result-sub">',
      '    {{for: id2,item2 in item1.child}}',
      '    <li class="select2-results-dept-1 select2-result">',
      '      <div {{if:item2.disabled}} disabled="disabled"{{/if}} {{if:item2.unselectable}} unselectable="unselectable"{{/if}} value="{{item2.value}}" class="select2-result-label">',
      '        <span class="select2-match"></span>{{item2.text|decodeURI}}',
      '      </div>',
      '    </li>',
      '    {{/for}}',
      '  </ul>',
      '  {{/if}}',
      '</li>',
      '{{/for}}'
    ].join('\n')
    return tpl
  },
  connectedCallback: function() {
    // 这里设置的默认值，如果后面有:options=[...]会被重写
    // this.options = []
    // this.filterResult = []
  },
  childrenChangedCallback: function() {
    var me = this
    var main = me.getMain()
    // console.log('invoked childrenChangedCallback!')
    this.options = this.options || []
    this.filterResult = this.filterResult || this.options
    main.innerHTML = [
      '<span class="select2-choice form-control" tabindex="-1">',
      '  <span class="select2-chosen"></span>',
      '  <abbr class="select2-search-choice-close"></abbr>',
      '  <span class="select2-arrow"><b></b></span>',
      '</span>',
      '<input class="select2-focusser select2-offscreen" type="text" value="" tabindex="2">',
      '<div class="select2-drop select2-with-searchbox select2-drop-auto-width select2-drop-active" style="display: none;width: 100%;" id="select2-drop">',
      '  <div class="select2-search">',
      '    <input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="select2-input">',
      '  </div>',
      '  <ul class="select2-results select2-results1" style="display:block">',
      '  </ul>',
      '  <ul class="select2-results select2-results2" style="display:none">',
      '    <li class="select2-no-results">No result.</li>',
      '  </ul>',
      '</div>'
    ].join('\n')
    hui.addClass(main, 'select2-container select2')
    main.querySelector('.select2-search').style.display = main.getAttribute('searchable') ? 'block' : 'none'

    main.querySelector('.select2-choice').onclick = function() {
      var drop = main.querySelector('.select2-drop')
      if (drop && drop.style.display === 'block') {
        this.hideOptions()
      } else {
        main.querySelector('.select2-input').value = ''
        this.filterOptions()
      }
    }.bind(this)

    main.querySelector('.select2-input').onkeyup = function() {
      this.filterOptions()
    }.bind(this)

    hui.delegate(main, 'click', '.select2-result-label', function(evt, elem) {
      if (!elem.getAttribute('disabled') && !elem.getAttribute('unselectable')) {
        var value = elem.getAttribute('value')
        var selected = this.findOptionItem(value)
        if (selected) {
          this.setValue(selected)
        }
      }
      this.hideOptions()
    }.bind(this))

    if (main.value || main.getAttribute('value') || main.text || main.getAttribute('text')) {
      var elem = this
      var value = String(main.value || main.getAttribute('value') || '')
      var text = String(main.text || main.getAttribute('text') || '')
      elem.options.forEach(function(item) {
        if ((item.value === 0 || item.value) && String(item.value) === value) {
          text = item.text
        }
      })
      
      this.setValue({
        value: value,
        text: text
      })
    } else {
      main.querySelector('.select2-chosen').innerText = main.getAttribute('placeholder') || ''
    }

    if (main.getAttribute(':options')) {
      this.setOptions(Function('return ' + main.getAttribute(':options'))())
    }
    // var elem = main.querySelector('.input-elem')
    // var list = [
    //   'autocomplete','autofocus','checked','disabled','maxlength','name','pattern','placeholder','readonly','required','size','value','width'
    // ] // main.attributes
    // for (var i = list.length - 1; i > -1; i--) {
    //   elem.setAttribute(list[i], list[i].value)
    // }
    // this.setValue(this.value)
  },
  // 相当于v0中的attributeChangedCallback,但新增一个可选的observedAttributes属性来约束所监听的属性数目
  attributeChangedCallback: function(attrName, oldVal, newVal) {
    if (String(attrName).toLowerCase() === 'searchable') {
      this.getMain().querySelector('.select2-search').style.display = newVal ? 'block' : 'none'
    }
  },
  // 始终返回 String
  getValue: function() {
    var me = this
    var main = me.getMain()
    var elem = main.querySelector('.select2-focusser')
    if (elem) {
      // 如果组件的值存放在子元素上，在子元素尚未渲染成功前，需要通过me.value
      // 来临时存放value，记得子元素渲染成功后务必销毁me.value
      me.value = undefined
      delete me.value

      return String(elem.value)
    } else {
      return me.value !== undefined ? String(me.value) : ''
    }
  },
  setValue: function(v1, force) {
    var me = this,
      vv
    var main = me.getMain()
    // 非强制时选项中找不到就直接返回不继续设置；默认强制设置
    if (force === 'noforce' && !me.findOptionItem(v1)) return false
    var elem = main.querySelector('.select2-focusser')
    // 子元素尚未渲染好!
    if (elem) {
      me.value = undefined
      delete me.value

      // 候选项尚未渲染好!
      vv = typeof v1 === 'string' ? me.findOptionItem(v1) : v1
      if (vv) {
        var isChange = elem.value !== String(vv.value)
        var oldValue = elem.value
        main.querySelector('.select2-focusser').value = vv.value
        main.querySelector('.select2-chosen').innerText = vv.text
        if (isChange && me.onchange) me.onchange(String(vv.value), oldValue)
      } else {
        elem.value = v1
      }
    } else {
      me.value = v1
    }
  },
  setOptions: function(optList) {
    if (Object.prototype.toString.call(optList) !== '[object Array]') return false
    // optList = [{value: 1001,text: 'AAAA1'}, {value: 1002,text: 'AAAA2',disabled: 'disabled'}, {value: 1005,text: 'AAAA5',unselectable: 'unselectable'}, {value: 1003,text: 'AAAA3',selectable: 'selectable',child: [{value: 1004,text: 'AAAA4'}]}, {value: 1006,text: 'AAAA6',child: [{value: 1007,text: 'AAAA7'}]}]
    this.options = [].concat(optList)
    this.filterResult = [].concat(optList)
    // 更新下当前选中项
    if (this.findOptionItem(this.getValue())) {
      this.setValue(this.getValue())
    }
    return this
  },
  showOptions: function() {
    var me = this
    var main = me.getMain()
    this.hideOptions()
    // var mask = document.querySelector('.select-mask')
    // if (!mask) {
    //   mask = document.createElement('div')
    //   mask.className = 'select-mask'
    //   mask.style.cssText = 'display: block;position: fixed;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(250, 250, 250, 0.01);z-index: 300;'
    //   document.body.appendChild(mask)
    // }

    // mask.style.display = 'block'
    // mask.onclick = function (){
    //   this.hideOptions()
    // }.bind(this)

    var drop = main.querySelector('.select2-drop')
    var elem = main.querySelector('.select2-results1')
    if (!drop || !elem) {
      this.onChildRenderFinish(function() {
        this.showOptions()
      }.bind(this))
      return ''
    }
    var str = fetpl.compile(this.getTpl(), this.filterResult)
    elem.innerHTML = str
    drop.style.display = 'block'
    if (main.getAttribute('searchable')) main.querySelector('.select2-input').focus()

    this.globalHideHandler = this.globalHideHandler || hui.delegate(document.documentElement, 'click', '.select2-container', function() {
      this.hideOptions()
    }.bind(this), 'excluded')

    return this
  },
  hideOptions: function() {
    // var mask = document.querySelector('.select-mask')
    // if (mask) {
    //   mask.style.display = 'none'
    //   mask.onclick = null
    // }
    var drop = document.querySelectorAll('.select2-drop')
    if (drop && drop.length) {
      drop.forEach(function(elem) {
        elem.style.display = 'none'
      })
    }
    if (this.globalHideHandler)
      hui.undelegate(document.documentElement, 'click', this.globalHideHandler)
    this.globalHideHandler = ''
  },
  findOptionItem: function(value) {
    var result = null
    this.filterResult.forEach(function(item1) {
      if (result) return;
      if (String(item1.value) === String(value)) {
        result = item1
      } else if (item1.child && item1.child.length) {
        item1.child.forEach(function(item2) {
          if (result) return;
          if (String(item2.value) === String(value)) {
            result = item2
          }
        })
      }
    })

    return result
  },
  filterOptions: function() {
    var me = this
    var main = me.getMain()
    var key = String(main.querySelector('.select2-input').value).toLowerCase()
    var options = []
    this.options.forEach(function(item) {
      var result = null
      if (String(item.text || '').toLowerCase().indexOf(key) > -1) {
        result = Object.assign({}, item)
        if (item.child) result.child = []
      }
      if (item.child) {
        item.child.forEach(function(item2) {
          if (String(item2.text || '').toLowerCase().indexOf(key) > -1) {
            if (!result) {
              result = Object.assign({}, item)
              result.child = []
            }
            result.child.push(Object.assign({}, item2))
          }
        })
      }
      if (result) options.push(result)
    })
    this.filterResult = options
    if (!options.length) {
      main.querySelector('.select2-results1').style.display = 'none'
      main.querySelector('.select2-results2').style.display = 'block'
    } else {
      main.querySelector('.select2-results1').style.display = 'block'
      main.querySelector('.select2-results2').style.display = 'none'
    }
    this.showOptions()
  }
})

hui.importCssString([
  '.select2-container{margin:0;position:relative;display:inline-block;zoom:1;*display:inline;vertical-align:middle}',
  '.select2-container,',
  '.select2-drop,',
  '.select2-search,',
  '.select2-search input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}',
  '.select2-container .select2-choice{display:block;height:26px;padding:0 0 0 8px;overflow:hidden;position:relative;border-width:1px; border-style:solid;white-space:nowrap;line-height:26px;color:#444;text-decoration:none;border-radius:4px;background-clip:padding-box;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#fff;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#eee),color-stop(0.5,#fff));background-image:-webkit-linear-gradient(center bottom,#eee 0%,#fff 50%);background-image:-moz-linear-gradient(center bottom,#eee 0%,#fff 50%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr ="#ffffff",endColorstr ="#eeeeee",GradientType = 0);background-image:linear-gradient(top,#fff 0%,#eee 50%)}',
  '.select2-container.select2-drop-above .select2-choice{border-bottom-color:#aaa;border-radius:0 0 4px 4px;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#eee),color-stop(0.9,#fff));background-image:-webkit-linear-gradient(center bottom,#eee 0%,#fff 90%);background-image:-moz-linear-gradient(center bottom,#eee 0%,#fff 90%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff",endColorstr="#eeeeee",GradientType=0);background-image:linear-gradient(top,#eee 0%,#fff 90%)}',
  '.select2-choice{border-color: #aaa;}',
  '.select2-container.select2-allowclear .select2-choice .select2-chosen{margin-right:42px}',
  '.select2-container .select2-choice>.select2-chosen{margin-right:10px;display:block;white-space:nowrap;text-overflow:ellipsis}',
  '.select2-container .select2-choice abbr{display:none;width:12px;height:12px;position:absolute;right:24px;top:8px;font-size:1px;text-decoration:none;border:0;background:right top no-repeat;cursor:pointer;outline:0}',
  '.select2-container.select2-allowclear .select2-choice abbr{display:inline-block}',
  '.select2-container .select2-choice abbr:hover{background-position:right -11px;cursor:pointer}',
  '.select2-drop-mask{border:0;margin:0;padding:0;position:fixed;left:0;top:0;min-height:100%;min-width:100%;height:auto;width:auto;opacity:0;z-index:9998;background-color:#fff;filter:alpha(opacity=0)}',
  '.select2-drop{width:100%;margin-top:-1px;position:absolute;z-index:9999;top:100%;background:#fff;color:#000;border:1px solid #aaa;border-top:0;border-radius:0 0 4px 4px;-webkit-box-shadow:0 4px 5px rgba(0,0,0,0.15);box-shadow:0 4px 5px rgba(0,0,0,0.15)}',
  '.select2-drop-auto-width{border-top:1px solid #aaa;width:auto}',
  '.select2-drop-auto-width .select2-search{padding-top:4px}',
  '.select2-drop.select2-drop-above{margin-top:1px;border-top:1px solid #aaa;border-bottom:0;border-radius:4px 4px 0 0;-webkit-box-shadow:0 -4px 5px rgba(0,0,0,0.15);box-shadow:0 -4px 5px rgba(0,0,0,0.15)}',
  '.select2-drop-active{border:1px solid #5897fb;border-top:none}',
  '.select2-drop.select2-drop-above.select2-drop-active{border-top:1px solid #5897fb}',
  '.select2-container .select2-choice .select2-arrow{display:inline-block;width:18px;height:100%;position:absolute;right:0;top:0;border-left:1px solid #aaa;border-radius:0 4px 4px 0;background-clip:padding-box;background:#ccc;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#ccc),color-stop(0.6,#eee));background-image:-webkit-linear-gradient(center bottom,#ccc 0%,#eee 60%);background-image:-moz-linear-gradient(center bottom,#ccc 0%,#eee 60%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr ="#eeeeee",endColorstr ="#cccccc",GradientType = 0);background-image:linear-gradient(top,#ccc 0%,#eee 60%)}',
  '.select2-container .select2-choice .select2-arrow b{display:block;width:100%;height:100%;background:no-repeat 0 1px}',
  '.select2-search{display:inline-block;width:100%;min-height:26px;margin:0;padding-left:4px;padding-right:4px;position:relative;z-index:10000;white-space:nowrap}',
  '.select2-search input{width:100%;min-height:16px; line-height: 17px; padding:4px 20px 4px 5px;margin:0;outline:0;font-family:sans-serif;font-size:1em;border:1px solid #aaa;border-radius:0;-webkit-box-shadow:none;box-shadow:none;background:#fff no-repeat 100% -22px;background:no-repeat 100% -22px,-webkit-gradient(linear,left bottom,left top,color-stop(0.85,#fff),color-stop(0.99,#eee));background:no-repeat 100% -22px,-webkit-linear-gradient(center bottom,#fff 85%,#eee 99%);background:no-repeat 100% -22px,-moz-linear-gradient(center bottom,#fff 85%,#eee 99%);background:no-repeat 100% -22px,linear-gradient(top,#fff 85%,#eee 99%)}',
  '.select2-drop.select2-drop-above .select2-search input{margin-top:4px}',
  '.select2-search input.select2-active{background:#fff no-repeat 100%;background: no-repeat 100%,-webkit-gradient(linear,left bottom,left top,color-stop(0.85,#fff),color-stop(0.99,#eee));background:no-repeat 100%,-webkit-linear-gradient(center bottom,#fff 85%,#eee 99%);background:no-repeat 100%,-moz-linear-gradient(center bottom,#fff 85%,#eee 99%);background:no-repeat 100%,linear-gradient(top,#fff 85%,#eee 99%)}',
  '.select2-choices{border-color: #aaa;}',
  '.select2-container-active .select2-choice,',
  '.select2-container-active .select2-choices{border:1px solid #5897fb;outline:none;-webkit-box-shadow:0 0 5px rgba(0,0,0,0.3);box-shadow:0 0 5px rgba(0,0,0,0.3)}',
  '.select2-dropdown-open .select2-choice{border-bottom-color:transparent;-webkit-box-shadow:0 1px 0 #fff inset;box-shadow:0 1px 0 #fff inset;border-bottom-left-radius:0;border-bottom-right-radius:0;background-color:#eee;background-image:-webkit-gradient(linear,left bottom,left top,color-stop(0,#fff),color-stop(0.5,#eee));background-image:-webkit-linear-gradient(center bottom,#fff 0%,#eee 50%);background-image:-moz-linear-gradient(center bottom,#fff 0%,#eee 50%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#eeeeee",endColorstr="#ffffff",GradientType=0);background-image:linear-gradient(top,#fff 0%,#eee 50%)}',
  '.select2-dropdown-open.select2-drop-above .select2-choice,',
  '.select2-dropdown-open.select2-drop-above .select2-choices{border:1px solid #5897fb;border-top-color:transparent;background-image:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fff),color-stop(0.5,#eee));background-image:-webkit-linear-gradient(center top,#fff 0%,#eee 50%);background-image:-moz-linear-gradient(center top,#fff 0%,#eee 50%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#eeeeee",endColorstr="#ffffff",GradientType=0);background-image:linear-gradient(bottom,#fff 0%,#eee 50%)}',
  '.select2-dropdown-open .select2-choice .select2-arrow{background:transparent;border-left:none;filter:none}',
  '.select2-dropdown-open .select2-choice .select2-arrow b{background-position:-18px 1px}',
  '.select2-results{max-height:200px;padding:0 0 0 4px;margin:4px 4px 4px 0;position:relative;overflow-x:hidden;overflow-y:auto;-webkit-tap-highlight-color:rgba(0,0,0,0)}',
  '.select2-results ul.select2-result-sub{margin:0;padding-left:0}',
  '.select2-results ul.select2-result-sub>li .select2-result-label{padding-left:20px}',
  '.select2-results ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:40px}',
  '.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:60px}',
  '.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:80px}',
  '.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:100px}',
  '.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:110px}',
  '.select2-results ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub ul.select2-result-sub>li .select2-result-label{padding-left:120px}',
  '.select2-results li{list-style:none;display:list-item;background-image:none}',
  '.select2-results li.select2-result-with-children>.select2-result-label{font-weight:bold}',
  '.select2-results .select2-result-label{padding:3px 7px 4px;margin:0;cursor:pointer;min-height:1em;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}',
  '.select2-results .select2-result-label:hover{background:#446e9b;color:#fff}',
  '.select2-results .select2-result-label em{background:#feffde;font-style:normal}',
  '.select2-results .select2-result-label:hover em{background:transparent}',
  '.select2-results .select2-result-label:hover ul{background:#fff;color:#000}',
  '.select2-results .select2-result-label[unselectable="unselectable"]{cursor: default;}',
  '.select2-results .select2-result-label[unselectable="unselectable"]:hover {background: #f9f9f9;color: inherit;}',
  '.select2-results .select2-result-label[disabled="disabled"]{color: #ccc; cursor: not-allowed;}',
  '.select2-results .select2-result-label[disabled="disabled"]:hover {color: #ccc; background:#f9f9f9;}',
  '.select2-results .select2-no-results,',
  '.select2-results .select2-searching,',
  '.select2-results .select2-selection-limit{background:#f4f4f4;display:list-item}',
  '/*.select2-results .select2-disabled.select2-highlighted{color:#666;background:#f4f4f4;display:list-item;cursor:default}*/',
  '.select2-results .select2-disabled{background:#f4f4f4;display:list-item;cursor:default}',
  '.select2-results .select2-selected{display:none}',
  '.select2-more-results.select2-active{background:#f4f4f4 no-repeat 100%}',
  '.select2-more-results{background:#f4f4f4;display:list-item}',
  '.select2-container.select2-container-disabled .select2-choice{background-color:#f4f4f4;background-image:none;border:1px solid #ddd;cursor:default}',
  '.select2-container.select2-container-disabled .select2-choice .select2-arrow{background-color:#f4f4f4;background-image:none;border-left:0}',
  '.select2-container.select2-container-disabled .select2-choice abbr{display:none}',
  '.select2-container-multi .select2-choices{height:auto;height:1%;margin:0;padding:0;position:relative;border-width:1px; border-style:solid;cursor:text;overflow:hidden;background-color:#fff;background-image:-webkit-gradient(linear,0% 0%,0% 100%,color-stop(1%,#eee),color-stop(15%,#fff));background-image:-webkit-linear-gradient(top,#eee 1%,#fff 15%);background-image:-moz-linear-gradient(top,#eee 1%,#fff 15%);background-image:linear-gradient(top,#eee 1%,#fff 15%)}',
  '.select2-locked{padding:3px 5px 3px 5px}',
  '.select2-container-multi .select2-choices{min-height:26px}',
  '.select2-container-multi.select2-container-active .select2-choices{border:1px solid #5897fb;outline:none;-webkit-box-shadow:0 0 5px rgba(0,0,0,0.3);box-shadow:0 0 5px rgba(0,0,0,0.3)}',
  '.select2-container-multi .select2-choices li{float:left;list-style:none}',
  '.select2-container-multi .select2-choices .select2-search-field{margin:0;padding:0;white-space:nowrap}',
  '.select2-container-multi .select2-choices .select2-search-field input{padding:5px;margin:1px 0;font-family:sans-serif;font-size:100%;color:#666;outline:0;border:0;-webkit-box-shadow:none;box-shadow:none;background:transparent}',
  '.select2-container-multi .select2-choices .select2-search-field input.select2-active{background:#fff no-repeat 100%}',
  '.select2-default{color:#999}',
  '.select2-container-multi .select2-choices .select2-search-choice{padding:3px 5px 3px 18px;margin:3px 0 3px 5px;position:relative;line-height:13px;color:#333;cursor:default;border:1px solid #aaaaaa;border-radius:3px;-webkit-box-shadow:0 0 2px #fff inset,0 1px 0 rgba(0,0,0,0.05);box-shadow:0 0 2px #fff inset,0 1px 0 rgba(0,0,0,0.05);background-clip:padding-box;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#e4e4e4;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#eeeeee",endColorstr="#f4f4f4",GradientType=0);background-image:-webkit-gradient(linear,0% 0%,0% 100%,color-stop(20%,#f4f4f4),color-stop(50%,#f0f0f0),color-stop(52%,#e8e8e8),color-stop(100%,#eee));background-image:-webkit-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:-moz-linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%);background-image:linear-gradient(top,#f4f4f4 20%,#f0f0f0 50%,#e8e8e8 52%,#eee 100%)}',
  '.select2-container-multi .select2-choices .select2-search-choice .select2-chosen{cursor:default}',
  '.select2-container-multi .select2-choices .select2-search-choice-focus{background:#d4d4d4}',
  '.select2-search-choice-close{display:block;width:12px;height:13px;position:absolute;right:3px;top:4px;font-size:1px;outline:none;background:right top no-repeat;cursor:pointer;}',
  '.select2-container-multi .select2-search-choice-close{left:3px}',
  '.select2-container-multi .select2-choices .select2-search-choice .select2-search-choice-close:hover{background-position:right -11px}',
  '.select2-container-multi .select2-choices .select2-search-choice-focus .select2-search-choice-close{background-position:right -11px}',
  '.select2-container-multi.select2-container-disabled .select2-choices{background-color:#f4f4f4;background-image:none;border:1px solid #ddd;cursor:default}',
  '.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice{padding:3px 5px 3px 5px;border:1px solid #ddd;background-image:none;background-color:#f4f4f4}',
  '.select2-container-multi.select2-container-disabled .select2-choices .select2-search-choice .select2-search-choice-close{display:none;background:none}',
  '.select2-result-selectable .select2-match,',
  '.select2-result-unselectable .select2-match{text-decoration:underline}',
  '.select2-offscreen,',
  '.select2-offscreen:focus{clip:rect(0 0 0 0);width:1px;height:1px;border:0;margin:0;padding:0;overflow:hidden;position:absolute;outline:0;left:0px;top:0px}',
  '.select2-display-none{display:none}',
  '.select2-measure-scrollbar{position:absolute;top:-10000px;left:-10000px;width:100px;height:100px;overflow:scroll}',
  '@media only screen and (-webkit-min-device-pixel-ratio:1.5),only screen and (min-resolution:144dpi){',
  '  .select2-search input,',
  '  .select2-search-choice-close,',
  '  .select2-container .select2-choice abbr,',
  '  .select2-container .select2-choice .select2-arrow b{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAADFElEQVR42u2dsW4TQRBAI0ERCYpDpAUdJX/hAlxQ3SekovYXIIvKEiBRIUF1lHT+BP+Br0TCCCsFLW5cmCS3jKWNNFrdZu+EOG7sd9Irkl0p8r3s7Mzs5XLinIMD5uhvAIIBwYBgaMnNNZvNyj0nkUvPQbAdtDjnCSU3zkGwEbS4iOToHATbE6wptVwEGyUhcaW/JkTbT7JcCpIse4K7SC4pk4wRXreE5ZUMUwezgh03lT0YyKKBOhjoZHUi1oCf7mkYohd9ACVFrj50HgxzmtQifKwF15L1fxC8UD9/EQxzHtxC8KiD4FHPNWMhuIACwd33h3kLuXOZ2mc4yyLRZS1kCG6H3uc2Mbl+LO9Z8FRwEaYINnpDdWKVIEdwC/QVC4l97nk6sUqwQHA3wbGEa9Sj4CCxSlIguHtZMg8Tq/4Edy/bLNXB4/G4FKJ1sJ7zTwTrhMuTU3f+NVqc84SSG+bEJR99a3BoaHERybE5HDYYFKwptVwEGyUhcRX5PufBRoiH4Tg80WFMcBfJPJNljfC6JSzzVCUrGMHswUAWDdTBQCcLOveiCdEBnCYBb9kBBAOCAcGAYEDw0XP0NwDBgGBAMCAYEAwIHvD7QzJhIlSCE2rF0o9lav4eBBt5JWHR8EfzdYATfgkFgg2g5J4LdSD1WrjyXDeIPkfwsNErV6/Y38J34aXwWHgkvBJWwi74RSgQPGD8nrtRwrbCe+G0YX9+KHzyc2rPRsgQPFzBEyVrJ7xLvNTsjvBBuFQreYLg4Qpeqv32m3BP+YxJPhUulOAKwQMl2HsnymNK8mudeCF44IK9rCcdBD8XrhBsS/BTBBOibwTPCNEGCFqSX4X7LeSeCRdK8BLBwy6TdIPjo3A3kUF/pkyy1+ioPVsv8KxB7gPhi7BVcndCpqYheKCtSt1+vBR+CG+EZ8IL4a3wU69cRYlgC4cN4UFD/LDBNVAi2NZxYa0Ixe5ikhFs58B/2SC48mOZUMYkI/jw/61diWDzgtOSEWxdcFpyhWDTgtOSEWxccCgZwfZJ9akrJXiKYEDwMfAHMSYobVemsdsAAAAASUVORK5CYII=);background-repeat:no-repeat;background-size:60px 40px}',
  '  .select2-search input{background-position:100% -21px}',
  '}',
  '.select2-container .select2-choice,',
  '.select2-container.select2-drop-above .select2-choice{background:#FFF;height:28px;padding:6px 12px;;font-size:14px;line-height:1;-webkit-border-radius:4px;-moz-border-radius:4px;-ms-border-radius:4px;-o-border-radius:4px;border-radius:4px;cursor: default;}',
  '.select2-container .select2-choice .select2-arrow,',
  '.select2-container.select2-drop-above .select2-choice .select2-arrow{background:#FFF;border-left:none}',
  '.select2-container-multi .select2-choices{-webkit-border-radius:4px;-moz-border-radius:4px;-ms-border-radius:4px;-o-border-radius:4px;border-radius:4px;}',
  '.select2-container-multi .select2-choices .select2-search-field input{padding:8px 14px;font-size:13px;line-height:18px;height:auto}',
  '.select2-drop-active{border:1px solid #BBB;margin-top:3px;font-size:13px}',
  '.select2-drop-active.select2-drop-above{margin-bottom:8px}',
  '.select2-drop-active .select2-search input{background:#fafafa;border-color:#DDD}',
  '.select2-drop-active .select2-results{max-height:350px}',
  '.select2-container .select2-choice abbr,.select2-container .select2-choice .select2-arrow b,.select2-search input,.select2-search-choice-close {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAoCAYAAACiu5n/AAACLElEQVR42u3Zz0sUYRzH8bUISoyF1i5iXSooyYgOEXapZNYNojwU/aAfUAT9A4YhUgdxt1To0KFIBCMIvEcUEXntUtivpYuUhYFIdDBMmD69he/hObgsbSnb13ngdZjZhX3eO8/MDrMpSctKErwsg//HUSgU7uNYsB3hHla4CybqEoRPaMJGFCEMewxuxnsIk5iALPqg1yVdj9eQGUdjiuE1eAs+QOYztrsMJqwFk8EyHguW95klD+ZD08gsYvBFCBPYgHXBOT1UNpg3ncQpnAicRbrCCQ3j8SIf5QvYEWxvxnlb0mWDr0MIvcOaCiayC78gRKmlH+WDbaIjkJnDzgq/+VHIvMWqag3ehBkIAxXGdkAIDVRlsE24H9//4ty9hju4Hej710c5m83WYging32HMYjMnwSvx75UlQ+iOiDEaEMLZiA8dPc7TFQDnkGYxQ8Iz9Hs8k4riqIa4l5ApojVbm8tiduPL5CZRs5lMGFH8DNYxo+C5d3tMfgohJeow0qMQujxuqRb0RBsZ3DA2ZIuP5LgJDgJToKr4ZHOWjTOy+fzNa6DiezCFGReod1lMGF3IYzjMm5B5rirYIJyEJ4iHezfjW+YRr2n4EHE2LrAa1cg5DwFj2DWLlKljn67p+B+CIdKPAaOsddTcBOEKbTZvjp0Qvjo8Sp9DjJFfIVMjBsef4f34AHeYAxX0VfqMbDnfw97IXMTta6DLbobcxBa3Qdb9BPE2LZQ8G98530ecQi/2QAAAABJRU5ErkJggg==)}',
  '.select2-search input.select2-active,.select2-more-results.select2-active,.select2-container-multi .select2-choices .select2-search-field input.select2-active {background-image: url(data:image/gif;base64,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)}',

].join('\n'))