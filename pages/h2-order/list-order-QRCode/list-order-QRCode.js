// pages/h2-order/list-order-QRCode/list-order-QRCode.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    value: 'https://www.bilibili.com/'
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
      query: `query {
        search(
          orderid: "${this.data.orderid}"
        ) {
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
          hotel{
            hotelname
          }
          postorder{
            salary
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
        order_info: res.search[0]
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

  getQRCode: function() {
    wx.request({
      method: 'GET',
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa6d05046539eeb32&secret=a5eb6082e06379510f9873c933e2e93f',
      success: res => {
        console.log(res)
        let access_token = res.data.access_token
        wx.request({
          method: 'POST',
          url: `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`,
          success: res => {
            console.log(res)
          }
        })
      }
    })
  },

  previewImage() {
    // 在自定义组件下，当前组件实例的 this，以操作组件内 <canvas> 组件
    const that = this.selectComponent('#qrcode')

    wx.canvasToTempFilePath({
      canvasId: 'wux-qrcode',
      success: (res) => {
        wx.previewImage({
          urls: [res.tempFilePath]
        })
      }
    }, that)
  },

})