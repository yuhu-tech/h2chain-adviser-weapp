// pages/h2-account/login/login.js
var gql = require('../../../utils/graphql.js')
import {
  $inToptip
} from '../../../components/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '',
    password: '',
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
    wx.getStorage({
      key: 'email',
      success: res => {
        this.setData({
          email: res.data
        })
      },
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

  doCall: function() {
    wx.makePhoneCall({
      phoneNumber: '1234567890',
    })
  },

  iptEmail: function(e) {
    this.setData({
      email: e.detail.value
    })
  },

  clearEmail: function(e) {
    this.setData({
      email: ''
    })
  },

  iptPassword: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  clearPassword: function(e) {
    this.setData({
      password: ''
    })
  },

  isValidate: function() {
    if (!this.data.email) {
      $inToptip().show('请输入您的账号')
      return
    }
    if (!this.data.password) {
      $inToptip().show('请输入您的密码')
      return
    }
    this.isAuth()
  },

  isAuth: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.doLogin()
        } else {
          this.showModal()
        }
      }
    })
  },

  showModal: function(e) {
    this.setData({
      modalName: 'show'
    })
  },

  hideModal: function(e) {
    this.setData({
      modalName: null
    })
  },

  bindGetUserInfo: function(e) {
    wx.login({
      success: (res_login) => {
        wx.getUserInfo({
          success: (res_getUserInfo) => {
            this.hideModal()
            this.doLogin(res_login.code)
          }
        })
      }
    })
  },

  doLogin: function(code) {
    wx.showToast({
      title: '正在登录',
      icon: 'loading',
      duration: 10000
    })
    gql.mutate({
      mutation: `mutation {
        login(
          email: "${this.data.email}"
          password: "${this.data.password}"
          jscode:"${code}"
        ) {
          token
        }
      }`
    }).then((res) => {
      console.log('success', res);
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      try {
        wx.setStorageSync('email', this.data.email)
        wx.setStorageSync('token', res.login.token)
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/h2-order/list-order/list-order',
          })
        }, 1000)
      } catch (err) {
        console.log(err)
      }
    }).catch((error) => {
      if (error.errors[0].message === 'Invalid password') {
        $inToptip().show('密码不正确！')
        wx.hideToast()
      } else if (error.errors[0].message === "Cannot read property 'password' of undefined") {
        $inToptip().show('账户不正确！')
        wx.hideToast()
      } else {
        console.log(error)
        $inToptip().show('啊喔，不知道哪里出错了。')
        wx.hideToast()
      }
    });
  }

})