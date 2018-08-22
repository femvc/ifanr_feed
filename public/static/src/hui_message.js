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
hui.Message = {
  _getContainer: function() {
    var elem = document.querySelector('.ant-message-container')
    if (!elem) {
      elem = document.createElement('div')
      elem.className = 'ant-message ant-message-container'
      document.body.appendChild(elem)
    }
    return elem
  },
  _createNotice: function(tpl, timing) {
    var main = hui.Message._getContainer()
    var elem = document.createElement('div')
    elem.className = 'ant-message-notice move-up-leave move-up-leave-active'
    elem.innerHTML = [
      '<div class="ant-message-notice-content">' + tpl + '</div>'
    ].join('')
    elem.style.visibility = 'hidden'
    main.appendChild(elem)
    
    elem.querySelector('.anticon-close').onclick = function(){
      hui.Message._closeNotice.call(this)
    }.bind(elem)
    
    setTimeout(function() {
      this.style.visibility = 'visible'
      this.className = 'ant-message-notice move-up-appear move-up-appear-active'
      if (timing !== -1) {
        setTimeout(function() {
          hui.Message._closeNotice.call(this)
        }.bind(this), timing || 3000)
      }
    }.bind(elem), 1)
  },
  _closeNotice: function () {
    this.className = 'ant-message-notice move-up-leave move-up-leave-active'
    setTimeout(function() {
      var parent = hui.Message._getContainer()
      if (this.parentNode === parent) parent.removeChild(this)
    }.bind(this), 2000)
  },
  info: function(txt, timing) {
    var tpl = [
      '<div class="ant-message-custom-content ant-message-info">',
      '  <i class="anticon anticon-info-circle"></i>',
      '  <i class="anticon-close">×</i>',
      '  <span>' + txt + '</span>',
      '</div>'
    ].join('')
    hui.Message._createNotice(tpl, timing)
  },
  success: function(txt, timing) {
    var tpl = [
      '<div class="ant-message-custom-content ant-message-success">',
      '  <i class="anticon anticon-check-circle"></i>',
      '  <i class="anticon-close">×</i>',
      '  <span>' + txt + '</span>',
      '</div>'
    ].join('')

    hui.Message._createNotice(tpl, timing)
  },
  error: function(txt, timing) {
    var tpl = [
      '<div class="ant-message-custom-content ant-message-error">',
      '  <i class="anticon anticon-cross-circle"></i>',
      '  <i class="anticon-close">×</i>',
      '  <span>' + txt + '</span>',
      '</div>'
    ].join('')

    hui.Message._createNotice(tpl, timing)
  },
  warning: function(txt, timing) {
    var tpl = [
      '<div class="ant-message-custom-content ant-message-warning">',
      '  <i class="anticon anticon-exclamation-circle"></i>',
      '  <i class="anticon-close">×</i>',
      '  <span>' + txt + '</span>',
      '</div>'
    ].join('')

    hui.Message._createNotice(tpl, timing)
  },
  waiting: function(txt, timing) {
    var tpl = [
      '<div class="ant-message-custom-content ant-message-loading">',
      '  <i class="anticon anticon-spin anticon-loading"></i>',
      '  <i class="anticon-close">×</i>',
      '  <span>' + txt + '</span>',
      '</div>'
    ].join('')

    hui.Message._createNotice(tpl, timing || -1)
  },
  hide: function () {
    var parent = hui.Message._getContainer()
    var list = parent.childNodes
    for (var i = list.length - 1; i > -1; i--) {
      parent.removeChild(list[i])
    }
  }
}

hui.importCssString([
  // '.ant-message{font-size:12px;position:fixed;z-index:1010;width:100%;top:16px;left:0px;pointer-events:none;}',
  // '.ant-message .anticon{display:inline-block;font-style:normal;vertical-align:baseline;text-align:center;text-transform:none;line-height:1;text-rendering:optimizeLegibility;-webkit-font-smoothing:antialiased;}',
  // '.ant-message .anticon-spin {color:#108ee9;display:inline-block;animation:loadingCircle 0.8s linear infinite;}',
  // '.ant-message .anticon-spin .curve {position: relative; top: -6px;font-size: 17px;}',
  // '.ant-message .ant-message-notice{padding:8px;text-align:center;}',
  // '.ant-message .ant-message-notice:first-child{margin-top:-8px;}',
  // '.ant-message .ant-message-notice-content{padding:8px 16px 8px 13px;border-radius:4px;box-shadow:rgba(0,0,0,0.2) 0px 2px 8px;background:rgb(255,255,255);display:inline-block;pointer-events:all;max-width: 600px;line-height: 18px;}',
  '.ant-message .anticon-close{color: #fff;float: right;padding: 5px;margin:-2px -6px -4px 4px;cursor: pointer;font-size:14px;line-height:12px;font-style: normal;}',
  '.ant-message .ant-message-notice-content:hover .anticon-close{color: #fc0000}',
  // '.ant-message .ant-message-custom-content{}',
  // '.ant-message .anticon{margin-right:8px;font-size:14px;top:0px;}',
  // '.ant-message .ant-message-success .anticon{background-color:#00a854;color:white;width:14px;height:14px;line-height:16px;border-radius:10px;text-align:center;font-family: "Californian FB"}',
  // '.ant-message .ant-message-error   .anticon{background-color:#ff0000;color:white;width:15px;height:14px;line-height:13px;border-radius:10px;text-align:center;}',
  // '.ant-message .ant-message-warning .anticon{background-color:#ffbf00;color:white;width:15px;height:14px;line-height:14px;border-radius:10px;text-align:center;}',
  // '.ant-message .ant-message-info .anticon{background-color:#d6d9f3;color:white;width:15px;height:14px;line-height:14px;border-radius:10px;text-align:center;}',
  // '.ant-message .ant-message-notice.move-up-leave.move-up-leave-active{animation-name:MessageMoveOut;overflow:hidden;animation-duration:0.2s;}',
  // '@keyframes loadingCircle{0%{transform-origin:50% 50%;transform:rotate(0deg)} to{transform-origin:50% 50%;transform:rotate(1turn)} }',
  // '.move-up-appear,.move-up-enter,.move-up-leave{animation-duration:.2s;animation-fill-mode:both;animation-play-state:paused}',
  // '.move-up-appear.move-up-appear-active,.move-up-enter.move-up-enter-active{animation-name:antMoveUpIn;animation-play-state:running}',
  // '.move-up-leave.move-up-leave-active{animation-name:antMoveUpOut;animation-play-state:running;pointer-events:none}',
  // '.move-up-appear,.move-up-enter{opacity:0;animation-timing-function:cubic-bezier(.08,.82,.17,1)}',
  // '.move-up-leave{animation-timing-function:cubic-bezier(.6,.04,.98,.34)}',
  // '@keyframes antMoveDownIn{0%{transform-origin:0 0;transform:translateY(100%);opacity:0}to{transform-origin:0 0;transform:translateY(0);opacity:1}}',
  // '@keyframes antMoveDownOut{0%{transform-origin:0 0;transform:translateY(0);opacity:1}to{transform-origin:0 0;transform:translateY(100%);opacity:0}}',
  // '@keyframes antMoveLeftIn{0%{transform-origin:0 0;transform:translateX(-100%);opacity:0}to{transform-origin:0 0;transform:translateX(0);opacity:1}}',
  // '@keyframes antMoveLeftOut{0%{transform-origin:0 0;transform:translateX(0);opacity:1}to{transform-origin:0 0;transform:translateX(-100%);opacity:0}}',
  // '@keyframes antMoveRightIn{0%{opacity:0;transform-origin:0 0;transform:translateX(100%)}to{opacity:1;transform-origin:0 0;transform:translateX(0)}}',
  // '@keyframes antMoveRightOut{0%{transform-origin:0 0;transform:translateX(0);opacity:1}to{transform-origin:0 0;transform:translateX(100%);opacity:0}}',
  // '@keyframes antMoveUpIn{0%{transform-origin:0 0;transform:translateY(-100%);opacity:0}to{transform-origin:0 0;transform:translateY(0);opacity:1}}',
  // '@keyframes antMoveUpOut{0%{transform-origin:0 0;transform:translateY(0);opacity:1}to{transform-origin:0 0;transform:translateY(-100%);opacity:0}}',
  // '@keyframes MessageMoveOut{0%{opacity:1;max-height:150px;padding:8px}to{opacity:0;max-height:0;padding:0}}',
  ''
].join(''))
