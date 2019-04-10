// pages/h2-order/template-order/template-order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'content',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type) {
      this.setData({
        type: options.type
      })
    }
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
    wx.getStorage({
      key: this.data.type,
      success: res => {
        this.setData({
          list: res.data
        })
        console.log(this.data.list)
      },
      fail: err => {
        wx.setStorage({
          key: this.data.type,
          data: [],
        })
      }
    })
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

  radioChange(e) {
    wx.setStorage({
      key: this.data.type === 'content' ? 'idx_content' : 'idx_attention',
      data: Number(e.detail.value),
    })
  },

  doEdit: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/template-new/template-new?type=${this.data.type}&add=${e.currentTarget.dataset.add}`,
    })
  },

  doSubmit: function() {
    wx.navigateBack({
      delta: 1
    })
  }

})