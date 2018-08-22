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
hui.createClass('x-boxpanel', {
  isformitem: false,
  childrenChangedCallback: function() {
    // console.log('invoked childrenChangedCallback!')
    var raw = this.innerHTML
    this.innerHTML = [
      '<div class="box-panel">',
      '  <div class="header box-panel-header">',
      '    <a class="switch-handler box-back" data-type="all">',
      '      <span class="icon icon-chevron-left"></span>',
      '      <span class="get-back">返回</span></a>',
      '    <span class="boxpanel-title">项目菜单</span>',
      '    <a class="icon icon-remove close-handler">X</a>',
      '  </div>',
      '  <div class="box-panel-body thin-scroll">',
      '  </div>',
      '</div>`'
    ].join('')

    this.querySelector('.box-panel-body').innerHTML = raw
    var container = this
    var width = this.getAttribute('width')
    if (width) container.style.width = width

    // var height = this.getAttribute('height')
    // if (height) container.style.height = height

    var name = this.querySelector('.boxpanel-title')
    name.innerHTML = this.getAttribute('name') || '&nbsp;'

    this.querySelector('.close-handler').addEventListener('click', function(){ this.close()})
    
    // this.close()
    this.setAttribute('title', '')
    hui.addClass(this, 'project-panel')
    
    this.onresizeHandler = this.onresizz.bind(this)
    this.onresizeCallback()
  },
  close: function() {
    this.style.display = 'none'
    if (hui.Mask) hui.Mask.hide()
    hui.undelegate(window, 'resize', '', this.resizeEventIndex)
  },
  show: function() {
    this.style.display = 'block'
    if (hui.Mask) hui.Mask.show()
    this.resizeEventIndex = hui.delegate(window, 'resize', '', this.onresizeHandler)
  },
  onresizz: function() {
    var me = this
    if (me.onresizeTimer) {
      window.clearTimeout(me.onresizeTimer)
    }
    me.onresizeTimer = window.setTimeout(hui.fn(me.onresizeCallback, me), 30)
  },
  onresizeCallback: function() {
    var me = this
    me.onresizeTimer = null
    // var top = Math.round(Math.max(0, (document.documentElement.clientHeight - main.clientHeight) * (me.top || 0.3)))
    // var left = Math.round(Math.max(0, (document.documentElement.clientWidth - main.clientWidth) * (me.left || 0.5)))
    // hui.importCssString('.' + me.getClass() + '{top:' + top + 'px;left:' + left + 'px; margin-left:0px;}', me.getClass('7181549444794655'))
    var dd = document.documentElement.clientHeight - parseInt(me.getAttribute('height'), 10)
    if (dd < 1) {
      hui.importCssString('x-boxpanel.project-panel{margin:0 auto;height:auto;}', 'x-boxpanel.project-panel')
    } else {
      hui.importCssString('x-boxpanel.project-panel{margin:auto;margin-top:' + (dd/3 + 'px') + ';height:' + me.getAttribute('height') + ';}', 'x-boxpanel.project-panel')
    }
    
    if (hui.Mask) hui.Mask.repaintMask()
  }
})

hui.importCssString([
  '.box-panel{position:relative;width:100%;height:100%;background-color:#ffffff;}',
  '.box-panel .get-back{font-size:15px;color:rgb(56,56,56);}',
  '.box-panel .box-back{transform:translate(-100%,0px);transition:transform 128ms ease-out,-webkit-transform 128ms ease-out;}',
  '.box-panel .box-panel-header{position:relative;overflow:hidden;height:50px;line-height:50px;text-align:center;z-index:2;}',
  '.box-panel .box-panel-header .title{padding:0px 15px;color:rgb(56,56,56);font-size:15px;font-weight:bold;z-index:1;}',
  '.box-panel .box-panel-header::after{position:absolute;content:" ";bottom:0px;height:1px;left:15px;right:15px;background-color:rgb(229,229,229);}',
  '.box-panel .box-panel-header>a{position:absolute;top:0px;width:50px;z-index:2;}',
  '.box-panel .box-panel-header>a:first-child{left:0px;}',
  '.box-panel .box-panel-header>a:last-child{right:0px;}',
  '.box-panel .box-panel-header .box-back{width:80px;}',
  '.box-panel .box-panel-header .box-back:hover .get-back{color:rgb(61,168,245);}',
  '.box-panel .box-panel-body{padding-top: 10px;position: absolute;z-index: 1;top: 50px;left: 0;right: 0;bottom: 0;overflow: auto;}',
  '.box-panel .icon-remove{text-decoration:none;color:#333333;}',
  '.box-panel .icon-remove:hover{text-decoration:none;color:red;}',
  '',
  'x-boxpanel.project-panel {z-index: 1001;position: fixed;top: 0;left: 0;bottom: 0;right: 0;margin: auto;background-color:transparent;border: 5px solid #c6c6c6;border-color: rgba(0,0,0,0.3);border-radius: 5px; display: none;}',
  'x-boxpanel.project-panel{opacity:1;}',
  '',
  '.hui_boxpanel_html{background-image: url(#);background-attachment: fixed;}',
  '.hui_boxpanel{z-index: 1001;position: fixed; _position: absolute; _top: expression(document.documentElement.scrollTop + Math.max(0, (document.documentElement.clientHeight - 500)*0.3) + "px"); background-color:white;border: 5px solid #c6c6c6;border-color: rgba(0,0,0,0.3); border-color: #c6c6c6\\0;*border-color: #c6c6c6; border-radius: 5px; display: none;}',
  '.hui_boxpanel_close{background-color: #8A8A8A;border-radius: 16px;color: #FFFFFF;display: block;font-family: Simsun;font-size: 14px; text-decoration:none; height: 24px;overflow: hidden;padding: 8px 0 0 10px;position: absolute;z-index:9999;right: -16px;top: -16px;width: 22px;}',
  '.hui_boxpanel_close:hover{background-color: #f62626;color: #fff; }',
  '.hui_boxpanel .box_mask{position: absolute;z-index: 10; width: 100%; height: 100%; text-align: center; background-color: #fff;}',
  '.hui_boxpanel .box_mask img {margin-top: 200px;}'
].join(''))

hui.Boxpanel = {
  create: function(opt) {
    var elem = document.getElementById(opt.id)
    if (!elem) {
      elem = document.createElement('x-boxpanel')
      elem.id = opt.id
      document.body.appendChild(elem)
    }
    elem.innerHTML = opt.contentView
    elem.setAttribute('name', opt.name)
    elem.setAttribute('width', opt.width || '600px')
    elem.setAttribute('height', opt.height || '480px')
    elem.style.display = 'block'

    return elem
  }
}