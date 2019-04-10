// pages/h2-order/history-order/history-order.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    order_list: [{
      job: '服务员',
      hotel_name: '希尔顿酒店',
      date: '2019-12-29',
      time: '10:00～14:00',
      isSex: false,
      count_male: 10,
      count_male_yet: 5,
      count_female: 10,
      count_female_yet: 5,
      salary: 20
    }, {
      job: '服务员',
      hotel_name: '希尔顿酒店',
      date: '2019-12-29',
      time: '10:00～14:00',
      isSex: true,
      count_male: 10,
      count_male_yet: 5,
      count_female: 10,
      count_female_yet: 5,
      salary: 20
    }]
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
    gql.query({
      query: `query{
        search(
          state:2
        ){
          state
          adviser{
            name
            companyname
          }
          originorder{
            orderid
            occupation
            datetime
            duration
            mode
            count
            male
            female
          }
          modifiedorder{
            changeddatetime
            changedduration
            changedmode
            changedcount
            changedmale
            changedfemale
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      for (let item of res.search) {
        let temp = new Date(item.originorder.datetime * 1000)
        let tempdate = `${util.formatTime(temp).slice(0, 10)}`
        let tempHour = temp.getHours()
        let tempMinutes = util.formatNumber(temp.getMinutes())
        let tempTime = `${util.formatNumber(tempHour)}:${tempMinutes}~${util.formatNumber(tempHour + item.originorder.duration)}:${tempMinutes}`
        item.originorder.date = tempdate
        item.originorder.time = tempTime
        if (item.modifiedorder.length > 0) {
          let temp = new Date(item.modifiedorder[0].changeddatetime * 1000)
          let tempdate = `${util.formatTime(temp).slice(0, 10)}`
          let tempHour = temp.getHours()
          let tempMinutes = util.formatNumber(temp.getMinutes())
          let tempTime = `${util.formatNumber(tempHour)}:${tempMinutes}~${util.formatNumber(tempHour + item.modifiedorder[0].changedduration)}:${tempMinutes}`
          item.modifiedorder[0].date = tempdate
          item.modifiedorder[0].time = tempTime
        }
      }
      console.log('success', res);
      this.setData({
        order_list: res.search
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

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
    let timeStamp = new Date(`${this.data.date}T00:00:00`).getTime() / 1000
    gql.query({
      query: `query{
        search(
          datetime:${Number(timeStamp)}
          state:2
        ){
          state
          adviser{
            name
            companyname
          }
          originorder{
            orderid
            occupation
            datetime
            duration
            mode
            count
            male
            female
          }
          modifiedorder{
            changeddatetime
            changedduration
            changedmode
            changedcount
            changedmale
            changedfemale
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      for (let item of res.search) {
        let temp = new Date(item.originorder.datetime * 1000)
        let tempdate = `${util.formatTime(temp).slice(0, 10)}`
        let tempHour = temp.getHours()
        let tempMinutes = util.formatNumber(temp.getMinutes())
        let tempTime = `${util.formatNumber(tempHour)}:${tempMinutes}~${util.formatNumber(tempHour + item.originorder.duration)}:${tempMinutes}`
        item.originorder.date = tempdate
        item.originorder.time = tempTime
        if (item.modifiedorder.length > 0) {
          let temp = new Date(item.modifiedorder[0].changeddatetime * 1000)
          let tempdate = `${util.formatTime(temp).slice(0, 10)}`
          let tempHour = temp.getHours()
          let tempMinutes = util.formatNumber(temp.getMinutes())
          let tempTime = `${util.formatNumber(tempHour)}:${tempMinutes}~${util.formatNumber(tempHour + item.modifiedorder[0].changedduration)}:${tempMinutes}`
          item.modifiedorder[0].date = tempdate
          item.modifiedorder[0].time = tempTime
        }
      }
      console.log('success', res);
      this.setData({
        order_list: res.search
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
  },

  goDetail: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/history-order-detail/history-order-detail?orderid=${e.currentTarget.dataset.orderid}`,
    })
  }

})