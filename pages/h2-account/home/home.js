// pages/h2-account/home/home.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    qlInfo: '',
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    wx.getUserInfo({
      success: res => {
        this.setData({
          userInfo: res.userInfo
        })
      }
    })
    gql.query({
      query: `query {
        me{
          name
          phone
          profile{
            companyname
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      this.setData({
        qlInfo: res.me
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '加载失败',
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

  doLogout: function() {
    wx.showModal({
      title: '确认退出账号？',
      success: res => {
        if (res.confirm) {
          wx.clearStorage()
          wx.reLaunch({
            url: '/pages/h2-account/login/login',
          })
        }
      }
    })
  },

  showWaiting: function() {
    wx.showToast({
      title: '暂未开放❤︎',
      icon: 'none'
    })
  }

})