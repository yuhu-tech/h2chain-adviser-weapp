// pages/h2-account/change-password/change-password.js
var gql = require('../../../utils/graphql.js')
import {
  $inToptip
} from '../../../components/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    old_psw: '',
    new_psw: '',
    re_psw: ''
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

  iptOldPsw: function(e) {
    this.setData({
      old_psw: e.detail.value
    })
  },

  iptNewPsw: function(e) {
    this.setData({
      new_psw: e.detail.value
    })
  },

  iptRePsw: function(e) {
    this.setData({
      re_psw: e.detail.value
    })
  },

  doCall: function() {
    wx.makePhoneCall({
      phoneNumber: '1234567890',
    })
  },

  doConfirm: function() {
    let reg = /^[a-zA-Z0-9]{6,18}$/;
    /* 非空检验 */
    if (!this.data.old_psw) {
      $inToptip().show('请输入旧密码')
      return
    }
    if (!this.data.new_psw) {
      $inToptip().show('请输入新密码')
      return
    }
    if (!reg.test(this.data.new_psw)) {
      $inToptip().show('密码为6～18位大小写字母、数字组合')
      return
    }
    if (this.data.new_psw == this.data.old_psw) {
      $inToptip().show('新密码不能与旧密码相同')
      return
    }
    if (!this.data.re_psw) {
      $inToptip().show('请再次输入新密码')
      return
    }
    /* validate */
    if (this.data.new_psw != this.data.re_psw) {
      $inToptip().show('两次输入的新密码不一致')
      return
    }
    
    gql.mutate({
      mutation: `mutation {
        changepassword(
          oldpassword: "${this.data.old_psw}"
          newpassword: "${this.data.new_psw}"
        ) {
          error
        }
      }`
    }).then((res) => {
      console.log('success', res);
      wx.showToast({
        title: '修改成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/h2-account/home/home',
        })
      }, 1000)
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      })
    });
  },

})