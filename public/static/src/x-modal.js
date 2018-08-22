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
 * @param {Object} args 控件初始化参数.
 */
hui.createClass('x-modal', {
  'x-modal': function (args, pending, opt_propMap) {
    window['x-tag'].call(this, args, 'pending')
    this.isformitem = args.isformitem === undefined ? false : true
    this.tagName = 'x-modal'

    // 进入控件处理主流程!
    if (pending != 'pending') {
      this.enterControl(opt_propMap)
    }
  },
  render: function (opt_propMap) {
    hui.Control.prototype.render.call(this, opt_propMap)
    var me = this
    // 渲染对话框
    // hui.Control.initChildControl(me.getMain(), {}, opt_propMap)
    // 注：注释掉是因为将在childrenChangedCallback中会执行hui.Control.initChildControl()!
    this.childrenChangedCallback()
  },
  isformitem: false,
  childrenChangedCallback: function () {
    // console.log('invoked childrenChangedCallback!')
    var me = this
    var main = me.getMain()
    // var raw = main.innerHTML
    // main.innerHTML = [
    //   '<div class="ant-modal-mask ant-modal-mask-hidden" style="display: block;"></div>',
    //   '<div class="ant-modal-wrap " style="/* display: none; */">',
    //   '  <!-- begin -->',
    //   '  <div class="ant-modal ant-confirm ant-confirm-confirm">',
    //   '    <div class="ant-modal-content">',
    //   '      <button class="ant-modal-close">x</button>',
    //   '      <div class="ant-modal-header">',
    //   '        <div class="ant-modal-title">Title</div>',
    //   '      </div>',
    //   '      <div class="ant-modal-body"><p>Content of the modal</p></div>',
    //   '    </div>',
    //   '    <div tabindex="0" style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>',
    //   '  </div>',
    //   '  <!-- end -->',
    //   '</div>'
    // ].join('\n')

    // main.querySelector('.ant-modal-wrap').innerHTML = raw
    
    var container = main.querySelector('.ant-modal')
    
    var width = main.getAttribute('width')
    if (width) container.style.width = width
    var height = main.getAttribute('height')
    if (height) container.style.height = height
    var classname = main.getAttribute('classname')
    if (classname) hui.addClass(main, classname)

    var close = main.querySelector('.ant-modal-close')
    if (close) close.addEventListener('click', function(){ this.close()}.bind(this))
    // this.close()
    var btnCancel = main.querySelector('.ant-btn-cancel')
    if (btnCancel) {
      btnCancel.addEventListener('click', function () {
        if (!this.onCancel || this.onCancel() !== false) this.close()
      }.bind(this))
    }
    var btnOK = main.querySelector('.ant-btn-ok')
    if (btnOK) {
      btnOK.addEventListener('click', function () {
        if (!this.onOK || this.onOK() !== false) this.close()
      }.bind(this))
    }
  },
  close: function () {
    var me = this
    var main = this.getMain()
    main.style.display = 'none'
    
    window.removeEventListener('resize', me.resizeHandle)
    me.resizeHandle = null
    if (hui.Mask && hui.Mask.hide) hui.Mask.hide()
  },
  show: function () {
    var me = this
    var main = this.getMain()
    main.style.display = 'block'
    var top = main.getAttribute('top')

    if (top && Number(top) && !isNaN(Number(top)) && !me.resizeHandle) {
      me.resizeHandle = function () {
        var me = this
        var main = this.getMain()
        var ctrid = hui.Control.parseCtrId(main)
        if (me.resizeTimer) return;
        me.resizeTimer = window.setTimeout(function(){
          me.resizeTimer = ''
          var dd = document.documentElement.clientHeight - (main.querySelector('.ant-modal') || {clientHeight: 300}).clientHeight
          var csstext = '.' + ctrid + ' .ant-modal {margin:0 auto;top:' + 
            Math.floor(Math.max(dd, 0) * Number(main.getAttribute('top'))) + 'px;}' 
          hui.importCssString(csstext, 'resizeCsstext' + ctrid)
          main.style.visibility = 'visible'
        }, 30)
      }.bind(me)
      window.addEventListener('resize', me.resizeHandle)
      me.resizeHandle()
    } else {
      main.style.visibility = 'visible'
    }
    if (hui.Mask && hui.Mask.hide) hui.Mask.show()
  },
  setContent: function (str) {
    var main = this.getMain()
    var elem = main.querySelector('.ant-modal-body')
    if (elem) elem.innerHTML = str
    hui.Control.initChildControl(elem)
  },
  setTitle: function (str) {
    var main = this.getMain()
    var elem = main.querySelector('.ant-modal-title')
    if (elem) elem.innerHTML = str
  }
})

hui.importCssString([
  'x-modal {}',
  'x-modal .ant-modal-close {right: 10px; top: 13px;}',
  'x-modal .x-modal-footer {text-align:right;}'
].join(''))

hui.Modal = {
  create: function (opt) {
    var elem = document.getElementById(opt.id) || document.createElement('x-modal')
    elem.id = opt.id || ''
    elem.innerHTML = [
      '<div class="ant-modal">',
      '  <div class="ant-modal-content">',
      '    <button class="ant-modal-close">x</button>',
      '    <div class="ant-modal-header">',
      '      <div class="ant-modal-title">' + (opt.title || '&nbsp;') + '</div>',
      '    </div>',
      '    <div class="ant-modal-body">',
      (opt.contentView ? document.getElementById(opt.contentView).innerHTML : (opt.content || '&nbsp;')),
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n')
    
    if (opt.formname) elem.setAttribute('formname', opt.formname)
    elem.setAttribute('width', opt.width || '500px')
    if (opt.height) elem.setAttribute('height', opt.height)
    if (opt.classname) elem.setAttribute('classname', opt.classname)
    if (opt.top) elem.setAttribute('top', opt.top)
    
    elem.style.visibility = 'hidden'
    elem.style.display = 'block'
    document.body.appendChild(elem)
    hui.Control.initChildControl(document.body)
    hui.Control.initChildControl(document.querySelector('.ant-modal-body'))
    
    return hui.Control.getByCtrId(hui.Control.parseCtrId(elem))
  },
  confirm: function (opt) {
    var tpl = [
      '<div class="ant-modal ant-confirm ant-confirm-confirm">',
      '  <div class="ant-modal-content">',
      '    <div class="ant-modal-body">',
      '      <div class="ant-confirm-body-wrapper">',
      '        <div class="ant-confirm-body">',
      '          <i class="anticon anticon-question-circle"></i>',
      '          <span class="ant-confirm-title">' + (opt.title || '&nbsp;') + '</span>',
      '          <div class="ant-confirm-content">' + (opt.content || '&nbsp;') + '</div>',
      '        </div>',
      '        <div class="ant-confirm-btns">',
      '          <button type="button" class="ant-btn ant-btn-cancel ant-btn-lg"><span>' + (opt.btnCancelText || 'Cancel') + '</span></button>',
      '          <button type="button" class="ant-btn ant-btn-ok ant-btn-primary ant-btn-lg"><span>' + (opt.btnOKText || 'OK') + '</span></button>',
      '        </div>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n')

    // opt.id = opt.id || String(new Date().getTime())
    // var elem = document.getElementById(opt.id) || document.createElement('x-modal')
    // elem.id = opt.id
    // elem.innerHTML = tpl // document.getElementById(content).innerHTML
    
    // elem.setAttribute('width', opt.width || '500px')
    // if (opt.height) elem.setAttribute('height', opt.height)
    // if (opt.classname) elem.setAttribute('classname', opt.classname)
    
    // elem.style.display = 'block'
    // document.body.appendChild(elem)

    // if (opt.onCancel) elem.onCancel = opt.onCancel
    // if (opt.onOK) elem.onOK = opt.onOK
    // return elem
    var item = hui.Control.getByFormname('common_confirm_modal')
    if (item && item.dispose) item.dispose()
    
    var elem = document.createElement('x-modal')
    elem.innerHTML = tpl
    
    elem.setAttribute('formname', 'common_confirm_modal')
    elem.setAttribute('width', opt.width || '500px')
    elem.setAttribute('height', opt.height || '170px')
    elem.setAttribute('top', opt.top || '0.25')
    if (opt.classname) elem.setAttribute('classname', opt.classname)
    
    elem.style.visibility = 'hidden'
    elem.style.display = 'block'
    document.body.appendChild(elem)
    hui.Control.initChildControl(document.body)

    item = hui.Control.getByFormname('common_confirm_modal')
    if (opt.onCancel) item.onCancel = opt.onCancel
    if (opt.onOK) item.onOK = opt.onOK
    item.show()

    return elem
  }
}
