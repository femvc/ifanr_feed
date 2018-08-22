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
hui.createClass('x-dialog', {
  isformitem: false,
  childrenChangedCallback: function() {
    // console.log('invoked childrenChangedCallback!')
    var raw = this.innerHTML
    this.innerHTML = [
      '<div class="activity-panel">',
      '  <div class="header activity-panel-header">',
      '    <a class="switch-handler activity-back" data-type="all">',
      '      <span class="icon icon-chevron-left"></span>',
      '      <span class="get-back">返回</span></a>',
      '    <span class="dialog-title">项目菜单</span>',
      '    <a class="icon icon-remove close-handler">X</a>',
      '  </div>',
      '  <div class="activity-panel-body thin-scroll">',
      '  </div>',
      '</div>`'
    ].join('')

    this.querySelector('.activity-panel-body').innerHTML = raw
    var container = this
    var width = this.getAttribute('width')
    if (width) {
      container.style.width = width
      container.style.right =  '-' + width
    } else {
      container.style.right =  '-600px'
    }
    var height = this.getAttribute('height')
    if (height) container.style.height = height

    var name = this.querySelector('.dialog-title')
    name.innerHTML = this.getAttribute('name') || '&nbsp;'

    this.querySelector('.close-handler').addEventListener('click', function(){ this.close()})
    // this.close()
    this.setAttribute('title', '')
    hui.addClass(this, 'project-panel')
  },
  close: function() {
    this.style.right =  (-this.offsetWidth - 10) + 'px'
  },
  show: function() {
    // this.style.display = 'block'
    this.style.right =  '0px'
  }
})

hui.importCssString([
  '.activity-panel{position:relative;width:100%;height:100%;}',
  '.activity-panel .get-back{font-size:15px;color:rgb(56,56,56);}',
  '.activity-panel .activity-back{transform:translate(-100%,0px);transition:transform 128ms ease-out,-webkit-transform 128ms ease-out;}',
  '.activity-panel .activity-panel-header{position:relative;overflow:hidden;height:50px;line-height:50px;text-align:center;z-index:2;}',
  '.activity-panel .activity-panel-header .title{padding:0px 15px;color:rgb(56,56,56);font-size:15px;font-weight:bold;z-index:1;}',
  '.activity-panel .activity-panel-header::after{position:absolute;content:" ";bottom:0px;height:1px;left:15px;right:15px;background-color:rgb(229,229,229);}',
  '.activity-panel .activity-panel-header>a{position:absolute;top:0px;width:50px;z-index:2;}',
  '.activity-panel .activity-panel-header>a:first-child{left:0px;}',
  '.activity-panel .activity-panel-header>a:last-child{right:0px;}',
  '.activity-panel .activity-panel-header .activity-back{width:80px;}',
  '.activity-panel .activity-panel-header .activity-back:hover .get-back{color:rgb(61,168,245);}',
  '.activity-panel .activity-panel-body{padding-top: 10px;position: absolute;z-index: 1;top: 50px;left: 0;right: 0;bottom: 0;overflow: auto;}',
  '.activity-panel .icon-remove{text-decoration:none;color:#333333;}',
  '.activity-panel .icon-remove:hover{text-decoration:none;color:red;}',
  'x-dialog.project-panel{position:fixed;width:600px;top:47px;right:0px;bottom:0px;z-index:50;background-color:rgb(247,247,247);box-shadow:rgba(0,0,0,0.1) -3px 0px 3px;opacity:0;transform:translate3d(360px,0px,0px);transition:0.25s cubic-bezier(0,1,0.39,1);}',
  'x-dialog.project-panel{opacity:1;transform:translate3d(0px,0px,0px);transition:0.4s cubic-bezier(0,1,0.39,1);overflow:hidden;}'
].join(''))

hui.Dialog = {
  create: function (opt) {
    var elem = document.getElementById(opt.id)
    if (!elem) {
      elem = document.createElement('x-dialog')
      elem.id = opt.id
      document.body.appendChild(elem)
    }
    elem.innerHTML = document.getElementById(opt.contentView).innerHTML
    elem.setAttribute('name', opt.name)
    if (opt.width) elem.setAttribute('width', opt.width)
    if (opt.height) elem.setAttribute('height', opt.height)
    elem.style.display = 'block'
    
    window.setTimeout(function(){
      this.style.right = '0px'
    }.bind(elem), 1)

    
    return elem
  }
}
