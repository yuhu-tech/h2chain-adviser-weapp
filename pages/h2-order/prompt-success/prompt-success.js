// pages/h2-order/prompt-success/prompt-success.js
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderid: options.orderid
    })
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
  onShareAppMessage: function(res) {

  },

  goReturn: function() {
    wx.switchTab({
      url: '/pages/h2-order/list-order/list-order',
    })
  },

  jumpToPt: function() {
    wx.navigateToMiniProgram({
      appId: 'wx0f2ab26c0f65377d',
      envVersion: 'trial',
      path: `/pages/h2-account/auth/auth?adviser=adviser&orderid=${this.data.orderid}`,
      success: res => {
        console.log(res)
      }
    })
  },

  jumpToAgent: function() {
    console.log(e)
    wx.navigateToMiniProgram({
      appId: 'wx4a5990881a856d65',
      envVersion: 'trial',
      path: `/pages/h2-account/auth/auth?adviser=adviser&orderid=${this.data.orderid}`,
      success: res => {
        console.log(res)
      }
    })
  }

})