// pages/h2-order/template-new/template-new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'content',
    add: '',
    template: '',
    list: [],
    idx: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type,
      add: options.add ? options.add : ''
    })
    console.log(this.data.add)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    /* 获取列表 */
    wx.getStorage({
      key: this.data.type,
      success: res => {
        this.setData({
          list: res.data
        })
      },
      fail: err => {
        wx.setStorage({
          key: this.data.type,
          data: [],
        })
      }
    })
    /* 编辑的情况下获取该条内容 */
    if (this.data.add !== 'add') {
      wx.getStorage({
        key: this.data.type === 'content' ? 'idx_content' : 'idx_attention',
        success: res => {
          this.setData({
            idx: res.data,
            template: this.data.list[res.data].content
          })
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  iptTemp: function(e) {
    this.setData({
      template: e.detail.value
    })
  },

  doSubmit: function() {
    if (this.data.add !== 'add') {
      this.data.list[this.data.idx].content = this.data.template
    } else {
      this.data.list.push({
        value: this.data.list.length,
        content: this.data.template
      })
    }
    wx.setStorage({
      key: this.data.type,
      data: this.data.list,
    })
    wx.navigateBack({
      delta: 1
    })
  }

})