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
hui.createClass('x-select3', {
  'x-select3': function(args, pending, opt_propMap) {
    window['x-tag'].call(this, args, 'pending')
    this.isformitem = args.isformitem === undefined ? true : false
    this.tagName = 'x-select3'

    // 进入控件处理主流程!
    if (pending != 'pending') {
      this.enterControl(opt_propMap)
    }
  },
  render: function(opt_propMap) {
    hui.Control.prototype.render.call(this, opt_propMap)
    // var me = this
    // 渲染对话框
    // hui.Control.initChildControl(me.getMain(), {}, opt_propMap)
    this.childrenChangedCallback()
  },
  isformitem: true,
  getOptionTpl: function() {
    var tpl = [
      '{{for: id1,item1 in it}}',
      '<li class="select2-results-dept-0 select2-result select2-result-selectable">',
      '  <div class="select2-result-label" value="{{item1.value}}">',
      '    <div class="user-result">',
      '      {{if:item1.img}}',
      '      <div class="user-image">',
      '        <img class="avatar s24" src="{{item1.img}}"></div>',
      '      {{/if}}',
      '      {{if:item1.text}}<div class="user-text">{{item1.text}}</div>{{/if}}',
      '      {{if:item1.desc}}<div class="user-desc">{{item1.desc}}</div>{{/if}}</div>',
      '  </div>',
      '</li>',
      '{{/for}}'
    ].join('\n')
    return tpl
  },
  childrenChangedCallback: function() {
    var me = this
    var main = me.getMain()
    // console.log('invoked childrenChangedCallback!')
    me.options = main.options || []
    me.filterResult = me.filterResult || me.options
    me.value = me.value || []
    me.choseOptions = []
    me.value.forEach(function(item) {
      var opt = me.findOptionItem(item)
      if (opt) me.choseOptions.push(opt)
    })
    var str = [
      '<ul class="select2-choices form-control">',
      '  <li class="select2-search-choice">',
      '    <div>feiyongping</div>',
      '    <a href="#" onclick="return false;" class="select2-search-choice-close" tabindex="-1"></a>',
      '  </li>',
      '  <li class="select2-search-choice">',
      '    <div>liuyang03</div>',
      '    <a href="#" onclick="return false;" class="select2-search-choice-close" tabindex="-1"></a>',
      '  </li>',
      '  <li class="select2-search-field">',
      '    <input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="select2-input">',
      '  </li>',
      '</ul>',
      '<input class="select2-focusser select2-offscreen" type="text" value="" tabindex="2">',
      '<div class="select2-drop select2-drop-multi select2-drop-active" style="display: none;width: 100%;">',
      '  <ul class="select2-results select2-results1">',
      '  </ul>',
      '  <ul class="select2-results select2-results2" style="display:none">',
      '    <li class="select2-no-results">No result.</li>',
      '  </ul>',
      '</div>'
    ].join('\n')
    try {
      main.innerHTML = str
    } catch (e) {}

    hui.addClass(main, 'select2-container select2-container-multi')
    var search = main.querySelector('.select2-search-field')
    if (search) search.style.display = main.getAttribute('searchable') ? 'block' : 'none'

    var choices = main.querySelector('.select2-choices')
    if (choices) choices.onclick = function() {
      var drop = main.querySelector('.select2-drop')
      if (drop && drop.style.display === 'block') {
        this.hideOptions()
      } else {
        main.querySelector('.select2-input').value = ''
        if (!this.unselectable) this.filterOptions()
      }
    }.bind(me)
    // 搜索功能
    var txtinput = main.querySelector('.select2-input')
    if (txtinput) {
      txtinput.onkeyup = function() {
        this.filterOptions()
      }.bind(me)
      if (main.getAttribute('placeholder')) txtinput.setAttribute('placeholder', main.getAttribute('placeholder'))
    }
    // 显示、隐藏下拉列表
    hui.delegate(main, 'click', '.select2-search-choice-close', function(evt, elem, host) {
      var value = elem.getAttribute('value')
      for (var i = this.choseOptions.length - 1; i > -1; i--) {
        if (String(this.choseOptions[i].value) === value) {
          this.choseOptions.splice(i, 1)
        }
      }
      for (i = this.value.length - 1; i > -1; i--) {
        if (String(this.value[i]) === value) {
          var oldValue = [].concat(this.value)
          this.value.splice(i, 1)
          if (me.onchange) me.onchange([].concat(this.value), oldValue)
        }
      }

      this.showSelected()
      if (this.afterSelected) this.afterSelected()
    }.bind(me))
    // 选择选项
    hui.delegate(main, 'click', '.select2-result-label', function(evt, elem, host) {
      if (!host.getAttribute('disabled') && !host.getAttribute('unselectable')) {
        var value = host.getAttribute('value')
        var selected = this.findOptionItem(value)
        if (selected) {
          var oldValue = [].concat(this.value)
          this.value.push(selected.value)
          this.choseOptions.push(selected)
          if (me.onchange) me.onchange([].concat(this.value), oldValue)
        }
        this.showSelected()
        var input = main.querySelector('.select2-input')
        if (input) input.value = ''
      }
      this.hideOptions()
      if (this.afterSelected) this.afterSelected()
    }.bind(me))

    me.showSelected()
  },
  // 相当于v0中的attributeChangedCallback,但新增一个可选的observedAttributes属性来约束所监听的属性数目
  attributeChangedCallback: function(attrName, oldVal, newVal) {
    if (String(attrName).toLowerCase() === 'searchable') {
      this.getMain().querySelector('.select2-search-field').style.display = newVal ? 'block' : 'none'
    }
  },
  getValue: function() {
    return this.value
  },
  setValue: function(vv) {
    var me = this
    if (!vv) vv = {
      value: []
    }
    if (vv && vv.join) vv = {
      value: vv
    }
    me.value = vv.value
    me.choseOptions = []
    me.value.forEach(function(item) {
      var opt = me.findOptionItem(item)
      if (opt) me.choseOptions.push(opt)
    })
    if (vv.filterResult) me.filterResult = vv.filterResult
    me.showSelected()
  },
  showSelected: function() {
    // var str = fetpl.compile(this.getSelectedTpl(), this.value)
    var container = this.getMain().querySelector('.select2-choices')
    var searchable = this.getMain().querySelector('.select2-search-field')
    // 先一个一个删除
    var list = container.querySelectorAll('.select2-search-choice')
    for (var i = list.length - 1; i > -1; i--) {
      list[i].parentNode.removeChild(list[i])
    }
    var users = {}
    this.filterResult.forEach(function(item1) {
      users[item1.value] = item1
    })
    this.options.forEach(function(item1) {
      users[item1.value] = item1
    })
    // 再一个一个插入
    this.value.forEach(function(value) {
      if (value && users[value]) {
        var item = users[value]
        var elem = document.createElement('li')
        elem.className = 'select2-search-choice'
        elem.innerHTML = '<div>' + item.text +
          '</div><i value="' + item.value + '" class="select2-search-choice-close"></i>'
        container.insertBefore(elem, searchable)
      }
    })

  },
  setOptions: function(optList) {
    if (Object.prototype.toString.call(optList) !== '[object Array]') return false
    var me = this
    // optList = [{value: 1001,desc: 1001,text: 'AAAA1'}, {value: 1002,desc: 1002,text: 'AAAA2',disabled: 'disabled'}, {value: 1005,desc: 1005,text: 'AAAA5',unselectable: 'unselectable'}]
    me.options = [].concat(optList)
    var fn = function(item) {
      return String(item.value) === String(me.choseOptions[i].value)
    }
    for (var i = me.choseOptions.length - 1; i > -1; i--) {
      if (!me.options.filter(fn).length) {
        me.options.unshift(me.choseOptions[i])
      }
    }
    me.filterResult = [].concat(optList)
  },
  showOptions: function() {
    var me = this
    var main = this.getMain()

    var drop = main.querySelector('.select2-drop')
    var results1 = main.querySelector('.select2-results1')
    var results2 = main.querySelector('.select2-results2')
    if (!drop || !results1) {
      this.childrenRenderFinish = function() {
        this.showOptions()
      }.bind(this)
      return ''
    }

    drop.style.display = 'block'
    if (!me.filterResult.length) {
      results1.style.display = 'none'
      results2.style.display = 'block'
    } else {
      results1.style.display = 'block'
      results2.style.display = 'none'

      var str = fetpl.compile(this.getOptionTpl(), this.filterResult)
      // var str = fetpl.compile(this.getOptionTpl(), [{value: 1, text: '111', desc: 'aaa'},{value: 2, text: '222', desc: 'bbb'}])
      results1.innerHTML = str
      if (main.getAttribute('searchable')) main.querySelector('.select2-input').focus()
    }
    this.globalHideHandler = this.globalHideHandler || hui.delegate(document.documentElement, 'click', '.select2-container', function() {
      this.hideOptions()
    }.bind(this), 'excluded')
  },
  hideOptions: function() {
    // var mask = document.querySelector('.select-mask')
    // if (mask) {
    //   mask.style.display = 'none'
    //   mask.onclick = null
    // }
    var drop = document.querySelectorAll('.select2-drop')
    if (drop && drop.length) {
      for (var i = 0; i < drop.length; i++) {
        drop[i].style.display = 'none'
      }
    }
    if (this.globalHideHandler)
      hui.undelegate(document.documentElement, 'click', this.globalHideHandler)
    this.globalHideHandler = ''
  },
  findOptionItem: function(value) {
    var result = null
    for (var i = this.options.length - 1; i > -1; i--) {
      if (String(this.options[i].value) === String(value)) {
        result = this.options[i]
        i = -1
      } else if (this.options[i].child) {
        for (var j = this.options[i].child.length - 1; j > -1; j--) {
          if (String(this.options[i].child[j].value) === String(value)) {
            result = this.options[i].child[j]
            j = i = -1
          }
        }
      }
    }
    return result
  },
  filterOptions: function() {
    var me = this
    var key = String(me.getMain().querySelector('.select2-input').value).toLowerCase()
    var oplist = []
    me.options.forEach(function(item) {
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
      me.value.forEach(function(item3) {
        if (result && String(item3) === String(result.value)) result = null
      })

      if (result) oplist.push(result)
    })
    me.filterResult = oplist
    if (!oplist.length) {
      me.getMain().querySelector('.select2-results1').style.display = 'none'
      me.getMain().querySelector('.select2-results2').style.display = 'block'
    } else {
      me.getMain().querySelector('.select2-results1').style.display = 'block'
      me.getMain().querySelector('.select2-results2').style.display = 'none'
    }
    me.showOptions()
  }
})

// <x-select3 class="users-selected" name="users-selected" searchable="searchable" style="width: 80%;" :options="[{uid: 1001,username: 1001,realname: 'AAAA1'}, {uid: 1002,username: 1002,realname: 'AAAA2',disabled: 'disabled'}, {uid: 1005,username: 1005,realname: 'AAAA5',unselectable: 'unselectable'}]"></x-select3>