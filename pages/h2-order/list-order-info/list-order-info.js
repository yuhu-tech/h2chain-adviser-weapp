// pages/h2-order/list-order-info/list-order-info.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    order: '',
    avatar: ''
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
            cover
          }
          countyet
          maleyet
          femaleyet
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let avatar = util.selectAvatar(res.search[0].originorder.occupation)
      util.formatItemOrigin(res.search[0])
      if (res.search[0].modifiedorder.length > 0) {
        util.formatItemModify(res.search[0])
      }
      res.search[0].postorder.workcontent = decodeURI(res.search[0].postorder.workcontent)
      res.search[0].postorder.attention = decodeURI(res.search[0].postorder.attention)
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
    /* wx.navigateToMiniProgram({
      appId: 'wx0f2ab26c0f65377d',
      envVersion: 'trial',
      path: `/pages/h2-order/share/share?orderid=${this.data.orderid}`,
      success: res => {
        console.log(res)
      }
    }) */
    wx.showToast({
      title: '敬请期待～❤︎',
      icon: 'none'
    })
  }

})