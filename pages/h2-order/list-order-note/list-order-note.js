// pages/h2-order/list-order-note/list-order-note.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')
import {
  $inToptip
} from '../../../components/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: '',
    isIn: '已参加',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    realPay: '',
    type: 1,
    range_in: ['已参加', '爽约']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options: options
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
    let remark = wx.getStorageSync('remark')
    if (remark) {
      let start = new Date(remark.startdate * 1000)
      let end = new Date(remark.enddate * 1000)
      let startDate = `${start.getFullYear()}-${util.formatNumber(start.getMonth())}-${util.formatNumber(start.getDay())}`
      let startTime = `${util.formatNumber(start.getHours())}:${util.formatNumber(start.getMinutes())}`
      let endDate = `${end.getFullYear()}-${util.formatNumber(end.getMonth())}-${util.formatNumber(end.getDay())}`
      let endTime = `${util.formatNumber(end.getHours())}:${util.formatNumber(end.getMinutes())}`
      this.setData({
        type: 2
      })
      if (remark.isworked === 1) {
        this.setData({
          startDate: startDate,
          startTime: startTime,
          endDate: endDate,
          endTime: endTime,
          realPay: remark.realsalary
        })
      }
    } else {
      this.setData({
        type: 1
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

  doIsIn: function(e) {
    console.log(e.detail.value)
    this.setData({
      isIn: Number(e.detail.value) === 0 ? '已参加' : '爽约'
    })
  },

  doStartDate: function(e) {
    console.log(e.detail.value)
    this.setData({
      startDate: e.detail.value,
      endTime: e.detail.value
    })
  },

  doStartTime: function(e) {
    console.log(e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  /* doEndDate: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  }, */

  doEndTime: function(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  doRealPay: function(e) {
    this.setData({
      realPay: e.detail.value
    })
  },

  doAbsence: function() {
    gql.mutate({
      mutation: `mutation{
        editremark(
          orderid:"${this.data.options.orderid}"
          ptid:"${this.data.options.ptid}"
          isworked:2
          type:${this.data.type}
        )
      }`
    }).then((res) => {
      console.log('success', res);
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      })
    });
  },

  doSave: function() {
    if (this.data.isIn === '爽约') {
      this.doAbsence()
      return
    }
    if (!this.data.startDate) {
      $inToptip().show('请选择开始日期')
      return
    }
    if (!this.data.startTime) {
      $inToptip().show('请选择开始时间')
      return
    }
    if (!this.data.endDate) {
      $inToptip().show('请选择结束日期')
      return
    }
    if (!this.data.endTime) {
      $inToptip().show('请选择结束时间')
      return
    }
    if (!this.data.realPay) {
      $inToptip().show('请输入实发薪酬')
      return
    }
    let startStamp = new Date(`${this.data.startDate}T${this.data.startTime}:00`).getTime() / 1000
    let endStamp = new Date(`${this.data.endDate}T${this.data.endTime}:00`).getTime() / 1000
    gql.mutate({
      mutation: `mutation{
        editremark(
          orderid:"${this.data.options.orderid}"
          ptid:"${this.data.options.ptid}"
          startdate:${Number(startStamp)}
          enddate:${Number(endStamp)}
          realsalary:${Number(this.data.realPay)}
          isworked:1
          type:${this.data.type}
        )
      }`
    }).then((res) => {
      console.log('success', res);
      wx.showToast({
        title: '操作成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '操作失败',
        icon: 'none'
      })
    });
  }

})