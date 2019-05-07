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
    console.log(res);
    if (!res.target) {
      return {
        title: 'none',
        path: '/pages/h2-account/auth/auth?type=none',
        imageUrl: '/images/order-avatar.png'
      }
    }
    if (res.target.dataset.type === 'pt') {
      return {
        title: '分享给PT',
        path: '/pages/h2-account/auth/auth?type=pt',
        imageUrl: '/images/order-avatar.png'
      }
    }
    if (res.target.dataset.type === 'adviser') {
      return {
        title: '分享给顾问',
        path: '/pages/h2-account/auth/auth?type=adviser',
        imageUrl: '/images/order-avatar.png'
      }
    }
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
    wx.navigateToMiniProgram({
      appId: 'wx0f2ab26c0f65377d',
      envVersion: 'trial',
      path: `/pages/h2-order/share/share?orderid=${this.data.orderid}`,
      success: res => {
        console.log(res)
      }
    })
  }

})