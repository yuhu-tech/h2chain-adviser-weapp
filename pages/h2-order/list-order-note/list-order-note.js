// pages/h2-order/list-order-note/list-order-note.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    realPay: ''
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
    if (Number(this.data.options.worked) === 1) {
      gql.query({
        query: `query{
          searchremark(
            orderid:"${this.data.options.orderid}"
            ptid:"${this.data.options.ptid}"
          ){
            startDate
            endDate
            realSalary
          }
      }`
      }).then(res => {
        console.log('success', res)
        /* ... */
      }).catch(err => {
        console.log('fail', err)
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

  doStartDate: function(e) {
    console.log(e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  doStartTime: function(e) {
    console.log(e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  doEndDate: function(e) {
    this.setData({
      endDate: e.detail.value
    })
  },

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
          isWorked:2
        ){
          error
        }
      }`
    }).then((res) => {
      console.log('success', res);
    }).catch((error) => {
      console.log('fail', error);
    });
  },

  doSave: function() {
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
          type:${1}
        )
      }`
    }).then((res) => {
      console.log('success', res);
    }).catch((error) => {
      console.log('fail', error);
    });
  }

})