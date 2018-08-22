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
hui.createClass('x-table', {
  isformitem: false,
  childrenChangedCallback: function() {
    this.type = 'table'

    /**
     * 选择行时用的关键字字段
     *
     * @public
     * @type {String}
     */
    
    this._keyfield = this.keyfield
    
    Object.defineProperty(this, 'keyfield', {
      get: function() {
        return this._keyfield
      },
      set: function(newValue) {
        if (newValue == 'word_id') debugger
        this._keyfield = newValue
      }
    })
    /**
     * 多时用于存储选择项的map[用于通过keyfield快速定位]和list[用于二次使用如作为新table的datasource]
     */
    this.selectedItemList = []
    this.selectedItemMap = {}
    /**
     * 单选时用于存储当前选择项的keyfield
     */
    this.preSelectIndex = null

    this.nodataHtml = this.nodataHtml || ''
    this.setFields(this.fields)
    
    this.render()
  },
  // 相当于v0中的attributeChangedCallback,但新增一个可选的observedAttributes属性来约束所监听的属性数目
  attributeChangedCallback: function(attrName, oldVal, newVal) {
    var str = String(attrName).toLowerCase()
    if (str === ':value' || str === 'value') {
      this.value = newVal
    }
  },
  /**
   * @desc dom表格起始的html模板
   * @private
   */
  tplTablePrefix: '<table cellpadding="0" cellspacing="0" border="0" width="100%" control="#{1}">',
  /**
   * @desc 将控件填充到容器元素
   * @public
   * @param {HTMLElement} container 容器元素.
   */
  appendTo: function(container) {
    var div = document.createElement('div')
    container.appendChild(div)
    this.render(div)
  },
  /**
   * @desc 初始化列宽
   * @private
   */
  initColsWidth: function() {
    var me = this,
      fields = me._fields,
      field,
      len = fields.length,
      width,
      i

    me.colsWidth = []

    // 读取列宽并保存
    var sum = 0
    var auto = 0
    for (i = 0; i < len; i++) {
      field = fields[i]
      if (/(px|pt|em)/.test(String(field.width))) continue
      width = parseFloat(field.width)
      if (isNaN(width)) {
        auto++
        field.width = 'auto'
      } else {
        sum += width
        field.width = width + '%'
      }
    }
    var autoWith = sum >= 100 || auto < 1 ? '0.01%' : (100 - sum)/auto + '%'
    for (i = 0; i < len; i++) {
      field = fields[i]
      if (/(px|pt|em)/.test(String(field.width))) {
        me.colsWidth.push(field.width)
        continue
      }
      width = parseFloat(field.width)
      if (isNaN(width)) {
        me.colsWidth.push(autoWith)
        field.width = autoWith
      } else {
        me.colsWidth.push(field.width)
      }
    }
  },
  /**
   * @desc 获取表格所在区域宽度
   * @private
   * @return {number}
   */
  getWidth: function() {
    if (this.width) {
      return this.width
    }

    // FIXME 有可能算出的width为0
    var me = this,
      width = 0,
      rulerDiv = document.createElement('div'),
      parent = me.getMain().parentNode
    if (parent) {
      parent.appendChild(rulerDiv)
      width = rulerDiv.offsetWidth
      parent.removeChild(rulerDiv)
    }

    return width
  },
  /**
   * @desc 第一列的多选框
   * @private
   */
  checkboxField: {
    width: '30px',
    stable: true,
    select: true,
    title: function() {
      return [
        '<input type="checkbox" id="',
        this.getCtrId('selectAll') + '"',
        (this.allChecked ? ' checked="checked"' : ''),
        ' onclick="',
        "hui.Control.getByCtrId('" + this.getCtrId() + "').toggleSelectAll()",
        '" />'
      ].join('')
    },

    render: function(item, index) {
      return [
        '<input type="checkbox" id="',
        this.getCtrId('multiSelect') + index + '"',
        'class="' + (this.selclass || '') + '"',
        'sid="' + item[this.keyfield] + '"',
        'index="' + index + '"',
        (this.selectedItemMap[item[this.keyfield]] ? ' checked="checked"' : ''),
        ' onclick="' + 'hui.Control.getByCtrId(\'' + this.getCtrId() + '\').rowCheckboxClick(\'' + index + '\',arguments[0]||window.event)' + '" />'
      ].join('')
    }
  },
  /**
   * @desc 第一列的单选框
   * @private
   */
  radioboxField: {
    width: '30px',
    stable: true,
    title: '&nbsp;',
    select: true,
    render: function(item, index) {
      var id = this.getCtrId('singleSelect')
      return [
        '<input type="radio" id="',
        id + index + '"',
        'clss="' + (this.selclass || '') + '"',
        'sid="' + item[this.keyfield] + '"',
        'index="' + index + '"',
        (this.preSelectIndex !== null && this.preSelectIndex == item[this.keyfield] ? ' checked="checked"' : ''),
        ' name="' + id + '" onclick="',
        'hui.Control.getByCtrId(\'' + this.getCtrId() + '\').selectSingle(\'' + index + '\');',
        'var e=arguments[0]||window.event;if(e.stopPropagation){e.stopPropagation();}else{e.cancelBubble=true;}" />'
      ].join('')
    }
  },
  /**
   * @desc 初始化表格的字段
   * @protected
   * @param {Array} fields 字段数组.
   */
  setFields: function(fields) {
    if (!fields) {
      return
    }

    // 避免刷新时重新注入
    var _fields = fields.slice(0),
      len = _fields.length
    while (len--) {
      if (!_fields[len]) {
        _fields.splice(len, 1)
      }
    }
    this._fields = _fields

    if (!this.select) {
      return
    }
    if (this.selwidth) {
      this.checkboxField.width = this.selwidth
      this.radioboxField.width = this.selwidth
    }

    switch (String(this.select).toLowerCase()) {
      case 'multi':
        _fields.unshift(this.checkboxField)
        break
      case 'single':
        _fields.unshift(this.radioboxField)
        break
    }
  },
  /**
   * @desc 获取列表体容器素
   * @public
   * @return {HTMLElement}
   */
  getBody: function() {
    return document.getElementById(this.getCtrId('body'))
  },
  /**
   * @desc 获取列表头容器元素
   * @public
   * @return {HTMLElement}
   */
  getHead: function() {
    return document.getElementById(this.getCtrId('head'))
  },
  /**
   * @desc 获取checkbox选择列表格头部的checkbox表单
   * @private
   * @return {HTMLElement}
   */
  getHeadCheckbox: function() {
    return document.getElementById(this.getCtrId('selectAll'))
  },

  onselectItem: function(index) {},
  /**
   * @desc 行的checkbox点击事件处理函数
   * @private
   */
  rowCheckboxClick: function(index, evt) {
    if (this.selectmode != 'line') {
      this.selectMulti(index, evt)
    } else {
      this.preSelectIndex = index
      // 后面会继续执行 rowClickHandler 方法（此方法中也会执行 selectMulti 方法）
    }
  },
  /**
   * @desc 根据checkbox是否全部选中，更新头部以及body的checkbox状态
   * @private
   * @param {number} index 需要更新的body中checkbox行，不传则更新全部.
   */
  selectMulti: function(index, evt) {
    var me = this,
      input,
      selectedItemId,
      cbIdPrefix = me.getCtrId('multiSelect')

    if (me.onselectItem && me.onselectItem(index) !== false) {
      input = document.getElementById(cbIdPrefix + index)
      selectedItemId = input.getAttribute('sid')

      if (evt && (evt.shiftKey || evt.ctrlKey) && String(me.preClickIndex) && String(me.preClickIndex) != String(index) && 
        document.getElementById(cbIdPrefix + me.preClickIndex).checked === input.checked) {
        me.selectBatch(input.checked, Math.min(me.preClickIndex, index), Math.max(me.preClickIndex, index))
      } else {
        me.selectBatch(input.checked, index, index)
      }
      me.preClickIndex = index
    }

    if (me.afterselect) {
      me.afterselect()
    }

    me.refreshSelected()
  },
  /**
   * @desc 单选选取
   * @private
   * @param {number} index 选取的序号.
   */
  selectSingle: function(index) {
    var me = this,
      input,
      selectedItemId,
      cbIdPrefix = me.getCtrId('singleSelect'),
      selectedIndex = me.selectedIndex

    if (me.onselectItem(index) !== false) {
      input = document.getElementById(cbIdPrefix + index)
      selectedItemId = input.getAttribute('sid')
      if (selectedIndex !== '' && me.selectedItemList.length == 1 &&
        String(parseInt(selectedIndex)) === String(selectedIndex).replace(/[ ]*/g, '')) {
        //这里本应该刷新列表,考虑到代价太大,只更新前一选择项,只是以后扩展可能会有隐患
        me.removeSelectedItem(me.selectedItemList[0][me.keyfield], selectedIndex)
      }
      me.selectedIndex = index
      //保存选择项
      if (selectedItemId) {
        me.addSelectedItem(selectedItemId, index)
      }

      if (me.afterselect) {
        me.afterselect()
      }
    }
  },
  /**
   * @desc 全选/不选 所有的checkbox表单
   * @private
   */
  toggleSelectAll: function() {
    this.selectBatch(this.getHeadCheckbox().checked, 1, this.datasource.length + 1)
  },
  /**
   * @desc 更新所有checkbox的选择状态
   * @private
   * @param {boolean} checked 是否选中.
   */
  selectBatch: function(checked, begin, end) {
    var me = this,
      inputs = me.getBody().getElementsByTagName('input'),
      len = inputs.length,
      i = 0,
      input, inputId, selectedItemId, index
    begin = Number(begin)
    end = Number(end)
    if (me.onselectItem('batch') !== false) {
      for (; i < len; i++) {
        input = inputs[i]
        inputId = input.id || ''
        selectedItemId = input.getAttribute('sid')
        index = Number(input.getAttribute('index'))
        if (input.getAttribute('type') === 'checkbox' && inputId.indexOf('multiSelect') > -1 && index >= begin && index <= end) {
          inputs[i].checked = checked
          if (checked) {
            if (!me.selectedItemMap[selectedItemId]) {
              me.addSelectedItem(selectedItemId, index)
            }
          } else {
            if (me.selectedItemMap[selectedItemId]) {
              me.removeSelectedItem(selectedItemId, index)
            }
          }
        }
      }
    }
    if (begin === 1 && end === me.datasource.length + 1) {
      me.allChecked = checked
    }

    if (me.afterselect) {
      me.afterselect()
    }
  },
  /**
   * @desc 选择功能 - 增加对应项
   * @private
   */
  addSelectedItem: function(selectedItemId, index) {
    var me = this,
      selectedClass = 'x-table-row-selected',
      i, len, list
    if (index !== undefined) index = parseInt(index)

    if (selectedItemId && String(selectedItemId).replace(/\s/g, '') != "undefined") {
      list = me.datasource
      for (i = 0, len = list.length; i < len; i++) {
        if (list[i][me.keyfield] == selectedItemId) {
          me.selectedItemList.unshift(list[i])
          me.selectedItemMap[selectedItemId] = 1
          break
        }
      }
    } else {
      if (!me.selectedItemMap[index]) {
        me.selectedItemList.unshift(index)
        me.selectedItemMap[index] = 1
      }
    }
    if (index !== undefined) {
      hui.addClass(me.getRow(index), selectedClass)
    }
  },
  /**
   * @desc 选择功能 - 删除对应项
   * @private
   */
  removeSelectedItem: function(selectedItemId, index) {
    var me = this,
      selectedClass = 'x-table-row-selected',
      i, len, list
    if (index !== undefined) index = parseInt(index)
    selectedItemId = String(selectedItemId || '')

    if (selectedItemId && selectedItemId.replace(/\s/g, '') != "undefined") {
      list = me.selectedItemList
      for (i = 0, len = list.length; i < len; i++) {
        if (String(list[i][me.keyfield]) === selectedItemId) {
          me.selectedItemList.splice(i, 1)
          me.selectedItemMap[selectedItemId] = undefined
          break
        }
      }
    } else {
      if (me.selectedItemMap[index]) {
        list = me.selectedItemList
        for (i = 0, len = list.length; i < len; i++) {
          if (String(list[i]) === String(index)) {
            me.selectedItemList.splice(i, 1)
            me.selectedItemMap[index] = undefined
            break
          }
        }
      }
    }
    if (index !== undefined) {
      hui.removeClass(me.getRow(index), selectedClass)
    }
  },
  /**
   * @desc 选择功能 - 刷新列表并检测是否已经全选
   * @private
   */
  refreshSelected: function() {
    var me = this,
      i, len, list,
      row, input, inputId,
      selectedClass = 'x-table-row-selected',
      cbIdPrefix = me.getCtrId('multiSelect'),
      allChecked = true,
      selectAll = me.getHeadCheckbox()

    list = me.getBody().getElementsByTagName('input')
    for (i = 0, len = list.length; i < len; i++) {
      input = list[i]
      inputId = input.id
      if (input.getAttribute('type') == 'checkbox' && inputId && inputId.indexOf(cbIdPrefix) >= 0) {
        row = me.getRow(input.getAttribute('index'))
        if (!input.checked) {
          allChecked = false
          hui.removeClass(row, selectedClass); // add speed
        } else {
          hui.addClass(row, selectedClass)
        }
      }
    }

    selectAll.checked = allChecked
    me.allChecked = allChecked
  },
  /**
   * @desc 绘制表格头
   * @private
   */
  renderHead: function() {
    var me = this,
      main = me.getMain(),
      type = 'head',
      id = me.getCtrId(type),
      head = document.getElementById(id)

    if (me.noTitle) {
      return
    }

    if (!head) {
      head = document.createElement('div')
      head.id = me.getCtrId(type)
      head.className = 'x-table-' + type
      main.appendChild(head)
    }

    head.style.width = '100%'
    head.innerHTML = me.getHeadHtml()
  },
  /**
   * @desc 获取表格头的html
   * @private
   * @return {string}
   */
  getHeadHtml: function() {
    var me = this,
      fields = this._fields,
      len = fields.length,
      html = [],
      i, field, title,
      thCntrClass = 'x-table-thcntr',
      thTextClass = 'x-table-thtext',
      sortClass = 'x-table-thsort',
      selClass = 'x-table-thsel',
      tipClass = 'x-table-thhelp',
      contentTpl = '<div class="#{0}">#{!!1}</div>#{!!2}',
      contentHtml,
      orderClass,
      sortIconHtml,
      sortable,
      currentSort,
      tipHtml


    // 拼装html
    html.push('<div class="ui-table-head-row">')
    html.push(hui.format(me.tplTablePrefix, '', me.getCtrId()))
    html.push('<tr>')
    for (i = 0; i < len; i++) {
      field = fields[i]
      title = field.title
      sortable = (me.sortable && field.sortable)
      currentSort = (sortable && field.field && field.field == me.orderBy)

      // 计算排序图标样式
      sortIconHtml = ''
      orderClass = ''
      if (sortable) {
        if (currentSort) {
          orderClass = ' ' + 'x-table-th' + me.order + ' ' + 'x-table-thcntr-sort'
        }
        sortIconHtml = hui.format(me.tplSortIcon,
          sortClass)
      }

      // 计算内容html
      // 如果通过function制定title，则不绘制排序小图标
      if ('function' == typeof title) {
        contentHtml = title.call(me)
        sortIconHtml = ''
      } else {
        contentHtml = title || ''
      }
      contentHtml = hui.format(contentTpl,
        thTextClass,
        contentHtml,
        sortIconHtml)
      html.push('<th id="' + this.getTitleCellId(i) + '" index="' + i + '"',
        sortAction(field, i),
        ' class="' + (field.select && me.selth ? me.selth : '') + ' ' + (field.thclass ? ' ' + field.thclass : '') + '"',
        ' style="width:' + me.colsWidth[i] + '" class="' + (field.thclass || '') + '">',
        '<div class="' + thCntrClass + orderClass +
        (field.select ? ' ' + selClass : '') + (field.thclass ? ' ' + field.thclass : '') + '">',
        contentHtml,
        tipHtml,
        '</div></th>')
    }
    html.push('</tr></table></div>')
    return html.join('')

    /**
     * 获取表格排序的单元格预定义属性html
     *
     * @private
     * @internal
     * @return {string}
     */
    function sortAction(field, index) {
      if (me.sortable && field.sortable) {
        return hui.format(
          ' onmouseover="#{0}" onmouseout="#{1}" onclick="#{2}" sortable="1"',
          "hui.Control.getByCtrId('" + me.getCtrId() + "').titleOverHandler(this)",
          "hui.Control.getByCtrId('" + me.getCtrId() + "').titleOutHandler(this)",
          "hui.Control.getByCtrId('" + me.getCtrId() + "').titleClickHandler(this)"
        )
      }

      return ''
    }
  },
  /**
   * @desc 获取表格头单元格的id
   * @private
   * @param {number} index 单元格的序号.
   * @return {string}
   */
  getTitleCellId: function(index) {
    return this.getCtrId('titleCell') + index
  },



  tplSortIcon: '<div class="#{0}"></div>',
  tplTipIcon: '<div class="#{0}" #{1}></div>',
  /**
   * @desc 表格头单元格鼠标移入的事件handler
   * @private
   * @param {HTMLElement} cell 移出的单元格.
   */
  titleOverHandler: function(cell) {
    this.sortReady = 1
    hui.addClass(cell.firstChild, 'x-table-thcntr-hover')
  },
  /**
   * @desc 表格头单元格鼠标移出的事件handler
   * @private
   * @param {HTMLElement} cell 移出的单元格.
   */
  titleOutHandler: function(cell) {
    this.sortReady = 0
    hui.removeClass(cell.firstChild, 'x-table-thcntr-hover')
  },
  /**
   * @desc 表格排序事件handler及默认排序方法
   * @private
   * @param {String} field 排序列.
   * @param {String} order 升降序asc/desc.
   */
  onsort: function(field, order) {},
  sort: function(field, order) {
    var me = this
    me.datasource.sort(function(a, b) {
      var m, n
      m = String(a[field]).toLowerCase()
      n = String(b[field]).toLowerCase()

      if (String(parseInt('0' + m, 10)) == m && String(parseInt('0' + n, 10)) == n) {
        m = parseInt(m, 10)
        n = parseInt(n, 10)
      } else {
        if (m > n) {
          m = 1
          n = -m
        } else if (m < n) {
          m = -1
          n = -m
        } else {
          m = 1
          n = m
        }
      }
      return (order == 'asc' ? m - n : n - m)
    })
    me.sorted = true
  },
  /**
   * @desc 表格内容点击的事件handler
   * @private
   * @param {Number} index 点击的行.
   */
  bodyClickHandler: function(cell) {},
  /**
   * @desc 表格头单元格点击的事件handler
   * @private
   * @param {HTMLElement} cell 点击的单元格.
   */
  titleClickHandler: function(cell) {
    if (this.sortReady) { // 避免拖拽触发排序行为
      var me = this,
        field = me._fields[cell.getAttribute('index')].field,
        orderBy = me.orderBy,
        order = me.order

      if (orderBy == field) {
        order = (!order || order == 'asc') ? 'desc' : 'asc'
      } else {
        order = 'desc'
      }

      me.sorted = false
      me.order = order
      me.orderBy = field
      if (me.onsort) {
        me.onsort(field, order)
      }
      if (!me.sorted) {
        me.sort(field, order)
      }

      //如果未定关键字段则每次排序都需要清空已选列表
      if (!me.keyfield) {
        this.selectedItemList = []
        this.selectedItemMap = {}
      }
      if (me.onsortFinished) {
        me.onsortFinished(field, order)
      }

      me.renderHead()
      me.renderBody()
    }
  },
  /**
   * @desc 绘制表格
   * @public
   */
  render: function() {
    var me = this

    var main = me.getMain();

    if (!me._fields) return;

    // 如果未绘制过，初始化main元素
    if (!me.isRendered) {
      hui.addClass(main, me.getCtrId())
    }

    me.initColsWidth()
    main.style.width = '100%'

    me.renderHead() // 绘制表格头
    me.renderBody() // 绘制列表

    me.isRendered = true
  },
  /**
   * @desc 重置表头样式
   * @private
   */
  resetHeadStyle: function() {
    var ths = this.getHead().getElementsByTagName('th'),
      len = ths.length,
      th

    while (len--) {
      th = ths[len]
      hui.removeClass(th.firstChild, 'x-table-thcntr-sort')
    }
  },
  /**
   * @desc 绘制表格主体
   * @private
   */
  renderBody: function() {
    var me = this,
      main = me.getMain(),
      type = 'body',
      id = me.getCtrId(type),
      list = document.getElementById(id)

    if (!list) {
      list = document.createElement('div')
      list.id = id
      list.className = 'x-table-' + type
      main.appendChild(list)
    }
    
    list.style.width = '100%'
    if (me.bodyheight) {
      list.style.height = me.bodyheight + 'px'
      list.style.overflowX = 'hidden'
      list.style.overflowY = 'auto'
    }
    list.innerHTML = me.getBodyHtml()
  },
  /**
   * @desc 获取表格体的单元格id
   * @protected
   * @param {number} rowIndex 当前行序号.
   * @param {number} fieldIndex 当前字段序号.
   * @return {string}
   */
  getBodyCellId: function(rowIndex, fieldIndex) {
    return this.getCtrId('cell') + rowIndex + '_' + fieldIndex
  },
  /**
   * @desc 获取表格主体的html
   * @private
   * @return {string}
   */
  getBodyHtml: function() {
    var data = this.datasource || [],
      dataLen = data.length,
      html = [],
      i, j, item, field

    if (!dataLen) {
      return this.nodataHtml || ''
    }

    for (i = 0; i < dataLen; i++) {
      item = data[i]
      if (item) {
        html.push(this.getRowHtml(item, i + 1))
      }
    }

    return html.join('')
  },

  tplRowPrefix: '<div id="#{0}" class="#{1}" onmouseover="#{2}" onmouseout="#{3}" onclick="#{4}">',
  /**
   * @desc 获取表格行的html
   * @protected
   * @param {Object} data 当前行的数据.
   * @param {number} index 当前行的序号.
   * @return {string}
   */
  getRowHtml: function(data, index) {
    var me = this,
      html = [],
      fields = me._fields || [],
      fieldLen = fields.length,
      field,
      colWidth,
      render,
      tdCntrClass = 'x-table-tdcntr',
      tdBreakClass = 'x-table-tdbreak',
      tdclass,
      contentHtml,
      i

    html.push(hui.format(me.tplRowPrefix,
        me.getCtrId('row') + index,
        'x-table-row' + (me.selectedItemMap[data[me.keyfield]] ? ' ' + 'x-table-row-selected' : ''),
        "hui.Control.getByCtrId('" + me.getCtrId() + "').rowOverHandler(" + index + ")",
        "hui.Control.getByCtrId('" + me.getCtrId() + "').rowOutHandler(" + index + ")",
        "hui.Control.getByCtrId('" + me.getCtrId() + "').rowClickHandler(" + index + ",arguments[0]||window.event)"
      ),
      hui.format(me.tplTablePrefix, '', me.getCtrId()))

    for (i = 0; i < fieldLen; i++) {
      field = fields[i]
      render = field.render
      colWidth = me.colsWidth[i]
      tdclass = field.breakLine ? tdBreakClass : tdCntrClass
      if (field.select) {
        tdclass += ' ' + 'x-table-tdsel'
      }


      contentHtml = '<div class="' + tdclass + '">'
      contentHtml += (field.breakLine ? '' : '<nobr>')
      contentHtml += (field.tdclass ? '<span class="' + field.tdclass + '">' : '')
      contentHtml += ('function' == typeof render ? render.call(me, data, index, i) : data[render])
      contentHtml += (field.tdclass ? '</span>' : '')
      contentHtml += (field.breakLine ? '' : '</nobr>') + '</div>'

      html.push('<td id="' + me.getBodyCellId(index, i) + '"',
        ' style="width:' + colWidth + '" control="' + me.getCtrId(),
        '" row="' + index + '" col="' + i + '" class="' + (field.tdclass || '') + ' ' + (field.select && me.seltd ? me.seltd : '') + '">',
        contentHtml,
        '</td>')
    }
    html.push('</tr></table></div>')

    return html.join('')
  },
  /**
   * @desc 表格行鼠标移上的事件handler
   * @private
   * @param {number} index 表格行序号.
   */
  rowOverHandler: function(index) {
    var row = this.getRow(index)
    if (row) {
      hui.addClass(row, 'x-table-row-over')
    }
  },
  /**
   * @desc 表格行鼠标移出的事件handler
   * @private
   * @param {number} index 表格行序号.
   */
  rowOutHandler: function(index) {
    var row = this.getRow(index)
    if (row) {
      hui.removeClass(row, 'x-table-row-over')
    }
  },
  /**
   * @desc 阻止行选，用于点击在行的其他元素，不希望被行选时。
   * @public
   */
  preventLineSelect: function() {
    this.dontSelectLine = 1
  },
  /**
   * @desc 表格行鼠标点击的事件handler
   * @private
   * @param {number} index 表格行序号.
   */
  rowClickHandler: function(index, evt) {
    if (this.selectmode == 'line') {
      if (this.dontSelectLine) {
        this.dontSelectLine = false
        return
      }

      var input

      switch (this.select) {
        case 'multi':
          input = document.getElementById(this.getCtrId('multiSelect') + index)
          // 如果点击的是checkbox，则不做checkbox反向处理
          if (!this.preSelectIndex) {
            input.checked = !input.checked
          }
          this.selectMulti(index, evt)
          this.preSelectIndex = null
          break
        case 'single':
          input = document.getElementById(this.getCtrId('singleSelect') + index)
          input.checked = true
          this.selectSingle(index)
          break
      }
    }
    this.bodyClickHandler(index)
  },
  /**
   * @desc 获取表格内容行的dom元素
   * @private
   * @param {number} index 行号.
   * @return {HTMLElement}
   */
  getRow: function(index) {
    return document.getElementById(this.getCtrId('row') + index)
  },
  /**
   * @desc 释放控件
   * @protected
   */
  dispose: function() {
    var head = document.getElementById(this.getCtrId('head'))

    if (head) {
      head.onmousemove = null
      head.onmousedown = null
    }
  }
})

hui.importCssString([
  'x-table {}',
  '.x-table-thcntr {background-image:url(data:image/gif;base64,R0lGODlhAQAUALMAAPHx8e7u7uvr6/Ly8u/v7+zs7O3t7fPz8+Tk5AAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAABABQAAAQK8JwBSDBFoM07igA7);}',
  '.x-table-thsort,',
  '.x-table-thhelp,',
  '.x-table-subentry,',
  '.x-table-subentry-opened,',
  '.x-table-subentry-opened-hover{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAeBAMAAAASpRmzAAAAElBMVEUAAAC9vb2tra1mZmYDAwMzMzMO/1rlAAAAAXRSTlMAQObYZgAAAEtJREFUCNdjYGBiAAIlASBDURDIEBQEMuHA1dXVgYHZ2BjINDYAEswgQRawjAGQEWwMZBgDZRBASUlJgYFRUBDIBJvECMRY7MCvAwA29wbLWQKO8QAAAABJRU5ErkJggg==)}',
  '',
  '.x-table{font-size:12px;}',
  '.x-table-head{background:#EEE;border-width:1px 1px 0px 0px;border-style:solid;border-color:#ccc;}',
  '.x-table-head-row{border-width:0px 0px 1px 0;border-color:#CCC;border-style:solid;background:#EEE;zoom:1;}',
  '',
  '/* 表头单元格 */',
  '.x-table-head th{border-width:0 0 1px 1px;border-color:#CCC;border-style:solid;font-weight:normal;}',
  '.x-table-head th input { margin: 3px 3px 3px 4px; }',
  '.x-table-body td input { margin: 3px 3px 9px 4px; }',
  '',
  '/* 表头单元格DIV容器 */',
  '.x-table-thcntr{height:21px;overflow:hidden;background-color:#EEE;background-position:left bottom;border-top:1px solid #F6F6F6;border-left:1px solid #F6F6F6;}',
  '',
  '/* 表头单元格标题 */',
  '.x-table-thtext{height:21px;line-height:18px;margin:0 5px;display:inline;float:left;}',
  '/* 表头单元格排序标识 */',
  '.x-table-thsort{margin-top:5px;background-repeat:no-repeat;height:10px;width:7px;font-size:1px;overflow:hidden;float:left;background-position:100px 100px;}',
  '.x-table-thasc .x-table-thsort{background-position:0px 0px;}',
  '.x-table-thdesc .x-table-thsort{background-position:0px -10px;}',
  '',
  '/* 表头单元格帮助标识 */',
  '.x-table-thhelp{height:15px;width:15px;background-repeat:no-repeat;background-position: -155px -315px;margin:6px 10px 0 0;display:inline;float:right;cursor:pointer;zoom:1;}',
  '',
  '/* 可排序列的表头样式Hover */',
  '.x-table-thcntr-hover{cursor:pointer;background:#FDE8C4;border-top:1px solid #FEF4E2;border-left:1px solid #FEF4E2;}',
  '',
  '/* 可排序列的表头样式sort */',
  '.x-table-thcntr-sort{cursor:pointer;}',
  '.x-table-body{background:#FFF;background-image:url(data:image/gif;base64,R0lGODlhBgAeAIAAAP////Hx8SwAAAAABgAeAAACDYSPqcvtD6OctNoTsi4AOw==);background-position:0px 0px;border-width:0px 1px 1px 1px;border-style:solid;border-color:#ccc;}',
  '',
  '/* 行表格样式 */',
  '.x-table-head table{table-layout:fixed;}',
  '.x-table-body table{table-layout:fixed;}',
  '.x-table-row{border-width:0px 0px 1px 0px;border-style:solid;border-color:#f1f1f1;background:#FFF;zoom:1;}',
  '.x-table-row .ui-combobox{float:left;top:2px;}',
  '',
  '/* 行表格移上 */',
  '.x-table-row-over{background-color:#FFFCE5;}',
  '',
  '/* 行表格选中 */',
  '.x-table-row-selected table{background:#FFF4DD;}',
  '',
  '/* 行表格展开 */',
  'div.x-table-row-unfolded table{background:#FDE8C4;}',
  '',
  '/* 表格内容单元格 */',
  '.x-table-body td{padding-left:1px;vertical-align:top;}',
  '',
  '/* 表格内容单元格容器 */',
  '.x-table-tdcntr{line-height:29px;height:29px;overflow:hidden;padding:0 5px;}',
  '.x-table-tdsel{height:24px;line-height:24px;padding-top:5px;}',
  '.x-table-tdbreak{line-height:29px;padding:0 5px;word-wrap:break-word;word-break:break-all;}',
  '.x-table-tdcntr a{zoom:1;}',
  '.x-table-tdcntr .ui-combobox{margin-top:4px;}',
  '',
  '/* 定义拖拽鼠标指针 */',
  '.x-table .x-table-startdrag,.x-table .x-table-startdrag .x-table-thcntr{cursor:col-resize;}',
  '',
  '/* 拖拽显示的竖线 */',
  '.x-table-mark{height:400px;width:1px;overflow:hidden;background:#000;position:absolute;}',
  '',
  '/* 子表格收起展开按钮 */',
  '.x-table-subentry,.x-table-subentry-opened,.x-table-subentry-opened-hover{overflow:hidden;width:11px;height:11px;background-repeat:no-repeat;cursor:pointer;padding:8px 8px 9px 8px;}',
  '.x-table-subentry{background-position:-24px -512px;}',
  '.x-table-subentry-opened{background-position:-2px -512px;}',
  '.x-table-subentry-hover{background-position:-24px -512px;}',
  '.x-table-subentry-opened-hover{background-position:-2px -512px;}',
  '.x-table-subrow{background:#FFF9EE;border-color:#CCC;border-style:solid;border-width:0 1px 1px;padding:0 0 0 36px;zoom:1;}',
  '.x-table-subrow .x-table-head{background:transparent;}',
  '.x-table-subrow .x-table-head-row{border:0;background:transparent;}',
  '.x-table-subrow .x-table-head table{border-color:#EBDDC9;border-style:solid;border-width:0 0 1px;}',
  '.x-table-subrow .x-table-head th{color:#CDBD99;background:transparent;border:0;}',
  '.x-table-subrow .x-table td{padding-left:0;}',
  '.x-table-subrow .x-table-body{background:none;}',
  '.x-table-subrow .x-table-body .x-table-row{background:transparent;border:0;}',
  '.x-table-subrow .x-table-thcntr{border:none;background:transparent;font-weight:400;}',
  '.x-table-subrow a{padding-left:2px;}',
  '.x-table-subrow .x-table-thtext{margin:0;}',
  '.x-table-subrow .x-table-tdcntr{padding-left:0;}',
  '.x-table-subrow .ui-star{display:none;}',
  '.x-table-subrow .ui-star-on,.x-table-subrow .ui-star-off{margin-left:4px;}',
  '.x-table-subentryfield table{border:0;}',
  '.x-table-thsel{padding-top:0px;}',
  '.list-table-foot{background-color:#EEEEEE;border:1px solid #CCCCCC;border-top:0px;font-size:12px;height:24px;line-height:24px;padding-left:5px;}'
].join(''))