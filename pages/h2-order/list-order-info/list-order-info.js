// pages/h2-order/list-order-info/list-order-info.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cover: ['https://pix6.agoda.net/agaff/aff.bstatic.com/images/hotel/max1024x768/106/106460799.jpg', 'https://pix6.agoda.net/agaff/aff.bstatic.com/images/hotel/max1024x768/111/111907305.jpg', 'https://pix6.agoda.net/agaff/aff.bstatic.com/images/hotel/max1024x768/111/111604695.jpg'],
    orderid: 'default',
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.orderid) {
      this.setData({
        orderid: options.orderid
      })
    }
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
          orderid:"${this.data.orderid}"
        ){
          adviser{
            companyname
            name
            phone
            introduction
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
          postorder{
            salary
            workcontent
            attention
          }
          hotel{
            hotelname
            hoteladdress
            hotelphone
            hotelintroduction
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let temp = new Date(res.search[0].originorder.datetime * 1000)
      let tempdate = `${util.formatTime(temp).slice(0, 10)}`
      let tempHour = temp.getHours()
      let tempMinutes = util.formatNumber(temp.getMinutes())
      let tempTime = `${util.formatNumber(tempHour)}:${tempMinutes}~${util.formatNumber(tempHour + res.search[0].originorder.duration)}:${tempMinutes}`
      res.search[0].originorder.date = tempdate
      res.search[0].originorder.time = tempTime
      if (res.search[0].modifiedorder.length > 0) {
        let temp = new Date(res.search[0].modifiedorder[0].changeddatetime * 1000)
        let tempdate = `${util.formatTime(temp).slice(0, 10)}`
        let tempHour = temp.getHours()
        let tempMinutes = util.formatNumber(temp.getMinutes())
        let tempTime = `${util.formatNumber(tempHour)}:${tempMinutes}~${util.formatNumber(tempHour + res.search[0].modifiedorder[0].changedduration)}:${tempMinutes}`
        res.search[0].modifiedorder[0].date = tempdate
        res.search[0].modifiedorder[0].time = tempTime
      }
      this.setData({
        order: res.search[0]
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

  doCall: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.order.adviser.phone,
    })
  },

  doClose: function() {
    wx.showModal({
      title: '提示',
      content: '确定关闭订单？',
      success: res => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/h2-order/prompt-close/prompt-close',
          })
        }
      }
    })
  }

})