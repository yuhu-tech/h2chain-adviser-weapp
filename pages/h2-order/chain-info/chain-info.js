// pages/h2-order/chain_info/chain_info.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hash: 'default',
    info: '',
    flag_address: true,
    flag_pt: true,
    flag_hotel: true,
    flag_adviser: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      hash: options.hash
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
    gql.query({
      query: `query{
        searchhash(
          txhash:"${this.data.hash}"
        ){
          chainname
          blocknumber
          contractaddress
          hash
          ptname
          ptaddr
          ptcer
          hotelname
          hotelcer
          hoteladdr
          hotelhrname
          advisername
          advisercer
          adviseraddr
          adviserhrname
          occupation
          datetime
          isrefused
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let temp = new Date(res.searchhash.datetime * 1000)
      res.searchhash.datetime = `${util.formatTime(temp).slice(0, 10)}`
      this.setData({
        info: res.searchhash
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
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

  doExpand: function(e) {
    this.setData({
      [`flag_${e.currentTarget.dataset.type}`]: false
    })
  },

  doFold: function(e) {
    this.setData({
      [`flag_${e.currentTarget.dataset.type}`]: true
    })
  },

  doCopy: function(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: res => {
        wx.showToast({
          title: '已复制'
        })
      }
    })
  }

})