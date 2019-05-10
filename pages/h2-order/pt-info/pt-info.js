// pages/h2-order/pt-info/pt-info.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pt_info: '',
    list: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    try {
      const value = wx.getStorageSync('pt_info')
      if (value) {
        this.setData({
          pt_info: value
        })
      }
    } catch (e) {
      console.log(e)
      wx.showToast({
        title: '获取信息失败',
        icon: 'none'
      })
    }
    gql.query({
      query: `query {
        searchhistory(
          ptid: "${this.data.pt_info.ptid}"
        ) {
          occupation
          hotelname
        }
      }`
    }).then((res) => {
      console.log('success', res);
      if (res.searchhistory.length > 0) {
        this.setData({
          list: res.searchhistory
        })
      }
    }).catch((error) => {
      console.log('fail', error);
    });
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

  doCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number,
    })
  }

})