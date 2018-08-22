'::hui_action::'
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
 * @name @name 页面流程控制类
 * @public
 * @author wanghaiyang
 * @date 2014/05/05
 * @param {Object} options 控件初始化参数.
 */

hui.Action = function() {}
hui.Action.prototype = {
  /**
   * @name Action的主要处理流程
   * @protected
   * @param {Object} argMap arg表.
   */
  enterAction: function(args) {
    var me = this
    var main = me.main

    new Promise(function(resolve) {
      //Action渲染过程中禁止跳转，否则容易造成死循环。
      hui.Master.ready = false

      // 设为活动action 
      me.active = true

      // 保存通过URL传过来的参数
      me.querystring = args
      // 注：默认增加一个空元素作为控件主元素!
      if (!main) {
        main = document.createElement('x-tag');
        var parentElement = null
        if (hui.Action.MAIN_ID) parentElement = document.querySelector(hui.Action.MAIN_ID)
        parentElement = parentElement || document.body || document.documentElement
        parentElement.appendChild(main)
        me.main = main
      }
      main.style.display = 'block'
      main.setAttribute('_rendered', '')
      main.setAttribute('_initbehavior', '')
      main.cc = []
      if (!main.getAttribute('ctrid')) {
        var ctrid = hui.makeGUID('')

        // 便于通过main.getAttribute('ctrid')找到control
        main.setAttribute('ctrid', ctrid)

        // !!(me.className不能删!!) 会在 getByCtrId(parseCtrId(main)时用到
        me.className = (me.className || '') + ' hui_ctrid' + ctrid

        hui.addClass(main, me.className)
        if (me.setSize) me.setSize()
      }

      // 初始化Model
      if (main.getAttribute('_initModel') == 'true') return resolve()
      if (me.initModel) {
        me.initModel()
        main.getAttribute('_initModel', 'true')
        resolve()
      } else if (me.initModelAsync) {
        me.initModelAsync(resolve)
      }
    }).then(function() {
      if (main.getAttribute('_initView') != 'true') {
        // me.initView()
        main.innerHTML = me.getView()
        main.getAttribute('_initView', 'true')
      }
      if (main.getAttribute('_rendered') != 'true') {
        if (me.render) me.render(me.model)
        main.setAttribute('_rendered', 'true')
      }
      if (main.getAttribute('_initbehavior') != 'true') {
        if (me.initBehaviorByTree) {
          me.initBehaviorByTree()
        } else if (me.initBehavior) {
          me.initBehavior()
        }
      }
      if (me.finish) me.finish()

      // hui.Action.getExtClass('hui.Mask').hideLoading()
      // 渲染结束，检查渲染期间是否有新请求
      hui.Master.checkNewRequest()
    })
  },
  /**
   * @name 初始化数据模型
   * @protected
   * @param {Object} argMap 初始化的参数.
   */
  // initModel: function (callback) {
  //     callback && callback()
  // },
  // checkAuthority: function(){},
  /**
   * @name 释放控件
   * @protected
   */
  dispose: function() {
    var me = this
    if (me.leave) me.leave()
      // hui.Control.prototype.dispose.call(me)
    if (me.model && me.model.dispose) {
      me.model.dispose()
      me.model = undefined
    }
    if (me.main) {
      me.main.style.display = 'none'
      me.main.innerHTML = ''
    }
    me.active = null
    if (me.clear) me.clear()
    for (var i = document.cc.length - 1; i > -1; i--) {
      if (document.cc[i] == me) document.cc.splice(i, 0)
    }
  },

  /**
   * @name 后退
   * @protected
   */
  back: function() {
    hui.Master.back()
  },

  /**
   * @name 退出
   * @public
   */
  leave: function() {},
  moveIn: function() {
    var me = this,
      main = me.main || null
    if (main) {
      main.style.display = 'block'
    }
  },
  moveOut: function(callback) {
    var me = this
    if (me.main) {
      me.main.style.display = 'none'
    }
    if (callback) callback()
  }
}

/**
 * @name 预处理流程
 * @public
 * @author wanghaiyang
 * @date 2014/05/05
 */
hui.Action.start = function() {
  /**
   * @name afterinit事件外部接口，在hui.Template.finishLoad之后执行
   * @public
   */
  if (hui.Action.beforeStart) {
    hui.Action.beforeStart()
  }
  // 2.初始化路由列表
  if (hui.Router && hui.Router.init) {
    hui.Router.init()
  }
  // 3.启动location侦听
  if (hui.Locator && hui.Locator.init) {
    // 默认首次进入的路径
    hui.Locator.init()
  }
  /**
   * @name afterinit事件外部接口，在hui.Template.finishLoad之后执行
   * @public
   */
  if (hui.Action.afterStart) {
    hui.Action.afterStart()
  }
}
hui.Action.beforeStart = function(callback) {
  // Todo
  // callback()
}
hui.Action.afterStart = function(callback) {
  // Todo
  // callback()
}

hui.createAction = function(opt) {
  return Object.assign(Object.create(hui.Action.prototype), opt)
}

hui.Router = {
  pathRules: [],
  /**
   * @name 根据location找到匹配的rule并返回对应的action
   * @public
   * @param {String} loc 路径
   */
  findAction: function(loc) {
    var me = this,
      pathRules = me.pathRules,
      i, len, matches, rule,
      action = null
      //匹配所有符合表达式的路径[正则表达式]
    for (i = 0, len = pathRules.length; i < len; i++) {
      rule = pathRules[i].location
      if (rule && (rule instanceof RegExp) && (matches = rule.exec(loc)) !== null) {
        action = pathRules[i].action
      }
    }
    //[优先]匹配单独具体路径
    for (i = 0, len = pathRules.length; i < len; i++) {
      rule = pathRules[i].location
      if (rule && (typeof rule == 'string') && rule == loc) {
        action = pathRules[i].action
      }
    }
    if (!action && window.console && window.console.error) {
      window.console.error('Route \'%s\' is not defined. Please use hui.Router.setRule(\'%s\', \'xxx\');', loc, loc)
    }
    return action
  },
  /**
   * @name 设置rule
   * @public
   * @param {String} rule 路径
   * @param {String} action 对应action
   */
  setRule: function(rule, action) {
    this.pathRules.push({
      'location': rule,
      'action': action
    })
  },
  /**
   * @name 载入完成读取所有rule
   * @protected
   * @param {String} rule 路径
   * @param {String} func 对应action
   */
  init: function(modules) {
    // Todo:
  },
  //错误处理
  error: function(msg) {
    msg = 'error: ' + msg
    if (window.console) {
      window.console.log(msg)
    } else throw Error(msg)
  }
}
hui.Master = {
  historyList: [],
  newRequest: null,
  ready: true,
  checkNewRequest: function() {
    var me = this,
      url = me.newRequest
    me.ready = true
    if (url) {
      me.newRequest = null
      me.forward(url)
    }
  },

  //仅供redirect时调用,必须保证url对应的action是有效的,跳转过程中不操作url,不推荐外部直接调用!!!
  forward: function(url) {
    var me = this

    // 注：由于forward的过程中不改变url，因此将可能改变url的hui.Permission.checkRouter放到hui.Locator.switchToLocation中了
    // 这里不可以通过me.getExtClass()去取!!
    // if (hui.Permission && hui.Permission.checkRouter) {
    //     hui.Permission.checkRouter(url, hui.fn(me.forwardCallback, me))
    // }
    // else {
    me.forwardCallback(url)

    //}
  },
  // 权限验证可能是一个异步过程!!
  forwardCallback: function(url) {
    var me = this,
      result, loc, args,
      action = null

    // Action渲染过程中禁止跳转，否则容易造成死循环，缓存新请求。
    if (me.ready === false) {
      me.newRequest = url
    }
    if (me.ready === true) {
      result = me.parseLocator(url)
      loc = result.location
      args = result.query

      // 首先销毁当前action的实例
      if (me.historyList[me.historyList.length - 1]) {
        // me.disposeAction(me.parseLocator(me.historyList[me.historyList.length - 1])['location'])
        action = hui.Router.findAction(me.parseLocator(me.historyList[me.historyList.length - 1]).location)
        if (action) {
          if (loc === me.historyList[me.historyList.length - 1]) {
            if (action.disposeChild) action.disposeChild()
          } else {
            if (action.moveOut) action.moveOut(action.dispose.bind(action))
          }
        }
      }
      // 找到匹配的路径规则(该过程中会创建action实例)
      action = hui.Router.findAction(loc)
      if (action && action.enterAction) {
        //Action渲染过程中禁止跳转，否则容易造成死循环。
        // 注：为解决手动构造action当url变化时不能刷新的问题，将me.ready = false 移到了enter()中
        //me.ready = false
        //时间不长则无需显示等待中
        //hui.Mask.timer = window.setTimeout('hui.Mask.showLoading()',300)
        //me.getExtClass('hui.Mask').showLoading()
        me.historyList.push(url)
        action.enterAction(args)
        if (action.moveIn) action.moveIn()
      }
    }
  },
  back: function() {
    var me = this,
      result, loc

    //有历史记录
    if (me.historyList.length > 1) {

      //当前action
      result = me.parseLocator(me.historyList.pop())
      loc = result.location
      me.disposeAction(loc)
      me.ready = true

      //后退一步
      hui.Locator.redirect(me.historyList.pop())
    }
    //无历史记录
    else {
      //当前action
      result = me.parseLocator(me.historyList[me.historyList.length - 1])
      loc = result.location

      //跳转到指定后退location
      loc = me.disposeAction(loc)
      if (loc) {
        hui.Locator.redirect(loc)
      }
    }
  },
  /**
   * @name 根据loc找到action
   * @private
   * @param {String} loc
   */
  disposeAction: function(loc) {
    var action = hui.Router.findAction(loc, 'nolog'),
      /* getByActionName参数可以接收'变量名'|'单例'|'Action子类' */
      defaultBack = (action && action.BACK_LOCATION) ? action.BACK_LOCATION : null
    if (action && action.disposeChild) {
      action.disposeChild()
    }
    return defaultBack
  },
  /**
   * @name 返回当前action实例
   * @public
   */
  get: function() {
    var loc = hui.Master.parseLocator()
    return hui.Router.findAction(loc.location, 'nolog')
  },
  /**
   * @name 解析获取到的location字符串
   * @private
   * @param {Object} loc
   */
  parseLocator: function(url) {
    url = url === null || url === undefined ? window.location.href : String(url)
    var query = {},
      loc = '',
      args = '',
      href = ~url.indexOf('#') ? url.split('#')[1] : url
    
    href = href.replace(/^!/, '')
    // Parse #?bb=xxx
    var pair = href.match(/^([^\?]*)(\?(.*))?$/)
    if (pair) {
      loc = pair[1]
      args = (pair.length == 4 ? pair[3] : '') || ''
    }
    var list = args ? args.split('&') : []
    for (var j = 0, len2 = list.length; j < len2; j++) {
      var v = list[j].split('=')
      v.push('')
      query[v[0]] = hui.decodeURI(v[1])
    }
    return {
      'location': loc,
      'query': query
    }
  },
  /**
   * @name 初始化控制器,包括路由器和定位器locator
   * @protected
   * @param {String} rule 路径
   * @param {String} func 对应action
   */
  init: function() {
    //var me = this
  }
}
hui.Locator = {
  /**
   * @name 默认首次进入的路径.
   * @default '/'
   * @public
   */
  DEFAULT_INDEX: '/',
  /**
   * @name 当前路径.
   * @public
   */
  currentLocation: null,
  /**
   * @name 获取location信息
   * @private
   * @return {String}
   */
  getLocation: function() {
    var hash

    // firefox下location.hash会自动decode
    // 体现在：
    //   * 视觉上相当于decodeURI，
    //   * 但是读取location.hash的值相当于decodeURIComponent
    // 所以需要从location.href里取出hash值
    if (/firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? +RegExp['\x241'] : undefined) {
      hash = location.href.match(/#(.*)$/)
      if (hash) hash = hash[1]
    } else {
      hash = location.hash
    }
    if (hash) {
      return hash.replace(/^#!+/, '').replace(/^#/, '').replace(/^!+/, '')
    }
    return ''
  },
  /**
   * @name 更新hash信息
   * @private
   * @param {String} loc
   */
  updateLocation: function(loc) {
    var me = this,
      isChange = (me.currentLocation != loc)

    // 存储当前信息
    // opera下，相同的hash重复写入会在历史堆栈中重复记录
    // 所以需要getLocation来判断
    if (me.currentLocation != loc && me.getLocation() != loc || window.location.hash !== '#!' + loc) {
      // 注释掉原因:自动改变hash后会导致死循环无法后退!!
      // window.location.hash = '!' + loc
    }
    me.currentLocation = loc
    me.currentPath = hui.Master.parseLocator(loc).location
    return isChange
  },
  /**
   * @name 控制定位器转向
   * @public
   * @param {String} loc location位置
   * @param {Object} opt_option 转向参数
   */
  redirect: function(loc, opt_option) {
    var me = hui.Locator,
      opt = opt_option || {},
      hisList,
      histotry = document.getElementById('histotry')
    if (!hui.Locator.hisList) {
      hui.Locator.hisList = []
    }
    hisList = hui.Locator.hisList
    hisList.push(loc)
    if (histotry) {
      histotry.innerHTML = hisList.join('<br/>')
    }

    // 非string不做处理
    if (typeof loc != 'string') {
      return
    }

    // 增加location带起始#号的容错性
    // 可能有人直接读取location.hash，经过string处理后直接传入
    loc = loc.replace(/^#!+/, '').replace(/^#/, '')

    // 空string当成DEFAULT_INDEX处理
    if (loc.length === 0) {
      loc = me.DEFAULT_INDEX
    }

    // 与当前location相同时不进行route
    var isLocChanged = me.updateLocation(loc)
    if (isLocChanged || opt.enforce) {
      loc = me.currentLocation
        // 触发onredirect事件
      me.onredirect(loc)
        // 当location未变化，强制刷新时，直接route
      if (isLocChanged === false) {
        hui.Locator.switchToLocation(loc)
      } else {
        // location被改变了,非强制跳转
        me.doRoute(loc)
      }
    }
  },
  /**
   * @name 权限判断以及重定向
   * @private
   * @param {String} loc location位置
   */
  doRoute: function(loc) {
    var me = this
      // 权限判断以及转向
    me.applyFilter(loc, hui.fn(me.doRouteCallback, me, loc))
  },
  doRouteCallback: function(loc) {
    var me = this
      // ie下使用中间iframe作为中转控制
      // 其他浏览器直接调用控制器方法
    me.switchToLocation(loc)
  },
  /**
   * @name Location变化调用接口
   * @public
   */
  switchToLocation: function(url) {
    var me = this,
      action,
      loc = url
      // Check url whether illegal.
    if (hui.Router && hui.Router.findAction) {
      // hui.Master.parseLocator(url)
      if (hui.Master && hui.Master.parseLocator) {
        loc = hui.Master.parseLocator(url)
        loc = loc ? loc.location : url
      }
      action = hui.Router.findAction(loc)
      url = action ? url : '/404'
    }
    // checkRouter的过程中可能会改变url
    if (hui.Locator.checkRouter) {
      hui.Locator.checkRouter(url, hui.fn(me.callMasterForward, me))
    } else {
      me.callMasterForward(url)
    }
  },
  /**
   * @name 解析获取到的location字符串
   * @private
   * @param {Object} loc
   *
  // 注: 放在Master是因为可能用户会直接使用url而非hashchange来跳转!
  parseLocator: function(url) {...},*/
  /**
   * @name 调用Master的forward接口 注：forward接口不推荐外部直接调用!!
   * @private
   */
  callMasterForward: function(url) {
    if (typeof hui != 'undefined' && hui.Master && hui.Master.forward) {
      hui.Master.forward(url)
    }
  },
  /**
   * @name onredirect事件外部接口
   * @interface
   * @public
   */
  'onredirect': new Function(),
  /**
   * @name 强制刷新当前地址
   * @method
   * @public
   */
  'reload': function() {
    var me = this
    if (me.currentLocation) {
      me.redirect(me.currentLocation, {
        enforce: true
      })
    }
  },
  /**
   * @name 初始化locator
   * @public
   */
  init: function() {
    var me = this
    window.onhashchange = function(args) {
      me.changeListener(args)
    }
    me.changeListener()
  },
  /**
   * @name hash变化的事件监听器
   * @method
   * @private
   */
  changeListener: function() {
    var me = this,
      loc = me.getLocation()
    if (!loc && !me.currentLocation) {
      me.redirect(me.DEFAULT_INDEX)
    } else if (loc && me.updateLocation(loc)) {
      me.doRoute(loc)
    }
  },
  /**
   * @name 路径权限规则列表
   * @property
   * @type {Array}
   * @default []
   * @public
   */
  filters: [],
  /**
   * @name 增加权限验证器
   * @method
   * @public
   * @param {Function} applyFilterr 验证器，验证失败时验证器返回转向地址
   */
  addFilter: function(rule, target) {
    var me = this
    if ('function' == typeof target) {
      me.filters.push({
        rule: rule,
        target: target
      })
    }
  },
  /**
   * @name 权限验证
   * @method
   * @private
   * @return {String} 验证失败时验证器返回转向地址
   */
  applyFilter: function(url, finish) {
    var filters = []
    var list = hui.Locator.filters
      //[优先]匹配单独具体路径
    for (var i = 0, ilen = list.length; i < ilen; i++) {
      if (list[i] && !(list[i].rule instanceof RegExp) && list[i].rule === url) {
        filters.unshift(list[i].target)
      }
    }
    //匹配所有符合表达式的路径[正则表达式]
    for (var j = list.length - 1; j > -1; j--) {
      if (list[j] && list[j].rule instanceof RegExp && list[j].rule.test(url)) {
        filters.push(list[j].target)
      }
    }
    this.applyFilterCallback(filters, finish)
  },
  applyFilterCallback: function(filters, finish) {
    if (filters.length) {
      var me = this
      var filter = filters.shift()
      if (typeof(filter) === 'function') {
        filter(function() {
          me.applyFilterCallback(filters, finish)
        }, finish)
      } else {
        me.applyFilterCallback(filters, finish)
      }
    } else {
      if (finish) finish()
    }
  }
}

// firework.addFilter(/^\/admin\//, function (route, next, jump) {
//     if (!isLogin) {
//         // 没登录就乖乖去登录
//         // 通过直接修改路由信息中的`path`来改变实际加载的页面
//         // 同时添加名为`form`的`query`参数，用于登录完成后跳转回之前的页面
//         route.query = { from: route.path }
//         route.path = '/login'
//         // 直接跳过后续的filter
//         jump()
//     }
//     else {
//         // 已经登录了
//         // 就好好继续执行下一个filter吧
//         next()
//     }
// })

document.cc = document.cc || []

/*============================================
 * 404 page
 ============================================*/
var page404 = hui.createAction({

  /**
   * @name Action索引ID
   * @comment 主要用于控件中通过onclick="hui.Control.getById('listTable', 'login')
   */
  id: 'page404',

  // 初始化数据模型
  // 使用了getView这里可以不用设置view属性
  // this.view = 'page404'
  // 初始化数据模型
  model: new Proxy({}, {
    get: function(target, key, receiver) {
      console.log(`getting ${key}!`)
      return Reflect.get(target, key, receiver)
    },
    set: function(target, key, value, receiver) {
      console.log(`setting ${key}!`)
      return Reflect.set(target, key, value, receiver)
    }
  }),
  getView: function() {
    var str = hui.format([
      '<div style="font-size:10pt;line-height:1.2em; line-height: 1.2em;padding: 15px;text-align: left;background-color: #f1f1f1;">',
      '<button style="display:none" ui="type:\'Button\'">ddd</button><h3 style="margin:0px;line-height:3em;">The page cannot be found</h3>',
      '<p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>',
      '<p>Please try the following:</p>',
      '<ul><li>If you typed the page address in the Address bar, make sure that it is spelled correctly.<br/></li>',
      '<li>Open the <a href="#!/">home page</a>, and then look for links to the information you want.</li>',
      '<li>Click the <a href="javascript:history.go(-1)">Back</a> button to try another link. </li>',
      '</ul><p><br></p>HTTP 404 - File not found<br />Need any help? Please contact the Monsieur {{name}}.<br /></div>'
    ].join(''), this.querystring)

    return str
  },
  initModel: function() {
    var me = this
    me.model.free = 'not free'
  },
  render: function() {
    //var me = this
    /*Requester.get('/mockup/user.json', {onsuccess:function(err, data){
      me.setInnerHTML(me, hui.format(me.getInnerHTML(), {name: data.result}))
    }})*/
    // 设置_rendered
    // debugger
    this.main.setAttribute('_rendered', 'true')
  },
  /**
   * @name 初始化列表行为
   * @param {Object} cc 当前主内容区域绘制的控件集合.
   */
  initBehavior: function() {
    //var me = this
  }
})
hui.Router.setRule('/404', page404)

// /*============================================
//  * 503 page
//  ============================================*/
// var page503
// page503 = function() {
//   hui.Action.call(this)

//   /**
//    * @name Action索引ID
//    * @comment 主要用于控件中通过onclick="hui.Control.getById('listTable', 'login')
//    */
//   this.id = 'page503'
//   this.parentElement = hui.Action.MAIN_ID

//   // 初始化数据模型
//   // 使用了getView这里可以不用设置view属性
//   // this.view = 'page503'
//   // 初始化数据模型
//   this.model = new Proxy({}, {
//     get: function(target, key, receiver) {
//       console.log(`getting ${key}!`)
//       return Reflect.get(target, key, receiver)
//     },
//     set: function(target, key, value, receiver) {
//       console.log(`setting ${key}!`)
//       return Reflect.set(target, key, value, receiver)
//     }
//   })
// }
// page503.prototype = {
//   getView: function() {
//     var str = hui.format([
//       '<h1>HTTP 503 - Srver error</h1><br />Need any help? Please contact the Monsieur {{name}}.<br /></div>'
//     ].join(''), this.querystring)

//     return str
//   },
//   initModel: function(callback) {
//     var me = this
//     me.model.free = 'not free'
//   },
//   render: function() {
//     this.main.setAttribute('_rendered', 'true')
//   },
//   /**
//    * @name 初始化列表行为
//    * @param {Object} cc 当前主内容区域绘制的控件集合.
//    */
//   initBehavior: function() {
//     //var me = this
//   }
// }

// hui.inherits(page503, hui.Action)
// window.page503 = page503
// hui.Router.setRule('/503', 'page503')

// /*============================================
//  * 505 page
//  ============================================*/
// var page505
// page505 = function() {
//   hui.Action.call(this)

//   /**
//    * @name Action索引ID
//    * @comment 主要用于控件中通过onclick="hui.Control.getById('listTable', 'login')
//    */
//   this.id = 'page505'
//   this.parentElement = hui.Action.MAIN_ID

//   // 初始化数据模型
//   // 使用了getView这里可以不用设置view属性
//   // this.view = 'page505'
//   // 初始化数据模型
//   this.model = new Proxy({}, {
//     get: function(target, key, receiver) {
//       console.log(`getting ${key}!`)
//       return Reflect.get(target, key, receiver)
//     },
//     set: function(target, key, value, receiver) {
//       console.log(`setting ${key}!`)
//       return Reflect.set(target, key, value, receiver)
//     }
//   })
// }
// page505.prototype = {
//   getView: function() {
//     var str = `
//       <x-tag id="uu">456
//         <x-tag id="ww" :isformitem="1" formname="password" name="uuuuuu" :text="hhh" value="789456"></x-tag>
//         789
//         <button onclick="dd.show()">alert</button>
//         <x-alert id="dd">qwqwqwq</x-alert>
//       </x-tag>`

//     return str
//   },
//   initModel: function(callback) {
//     var me = this
//     me.model.free = 'not free'
//   },
//   render: function() {
//     this.main.setAttribute('_rendered', 'true')
//   },
//   /**
//    * @name 初始化列表行为
//    * @param {Object} cc 当前主内容区域绘制的控件集合.
//    */
//   initBehavior: function() {
//     //var me = this
//   }
// }

// hui.inherits(page505, hui.Action)
// window.page505 = page505
// hui.Router.setRule('/505', 'page505')

// hui.Action.start()