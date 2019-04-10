// pages/h2-order/history-order-detail/history-order-detail.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    order_info: '',
    value_channel: '',
    pt_list: [{}, {}],
    multiArray: [
      ['代理端', 'PT分享', '顾问端分享', '现场扫码', '客户端报名'],
      []
    ],
    multiIndex: [0, 0],
    regMode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  onShow: function () {
    this.setData({
      ['multiArray[1]']: ['张大海', '赵小豪'],
      agent_list: ['张大海', '赵小豪'],
      pt_list: ['周淑芬', '王小丽']
    })
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
            isfloat
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

  doCall: function() {
    wx.makePhoneCall({
      phoneNumber: '1111111',
    })
  },

  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    console.log('改变了值', this.data.multiIndex)
  },

  bindMultiPickerColumnChange(e) {
    let multiArray = this.data.multiArray;
    let multiIndex = this.data.multiIndex
    multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (multiIndex[0]) {
          case 0:
            multiArray[1] = this.data.agent_list
            break
          case 1:
            multiArray[1] = this.data.pt_list
            break
          case 2:
            multiArray[1] = []
            break
          case 3:
            multiArray[1] = []
            break
          case 4:
            multiArray[1] = []
            break
        }
        multiIndex[1] = 0
        break
      default:
        break
    }
    console.log('移动了列', multiIndex)
    this.setData({
      multiArray: multiArray,
      multiIndex: multiIndex
    })
  },

  search: function() {
    console.log('do search')
  },

  goPtInfo: function() {
    wx.navigateTo({
      url: '/pages/h2-order/pt-info/pt-info',
    })
  }
})