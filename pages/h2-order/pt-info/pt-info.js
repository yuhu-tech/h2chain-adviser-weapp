// pages/h2-order/pt-info/pt-info.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pt_info: {
      avatar: '/images/order-avatar.png',
      name: '周海燕',
      gender: '女',
      nickName: '这里显示微信昵称',
      age: 24,
      weight: 53,
      height: 165
    },
    job_count: 22,
    job_hour: 4,
    latest: [{
      job: '保洁员',
      hotel_name: '希尔顿酒店'
    }, {
      job: '保洁员',
      hotel_name: '希尔顿酒店'
    }, {
      job: '保洁员',
      hotel_name: '希尔顿酒店'
    }, {
      job: '保洁员',
      hotel_name: '希尔顿酒店'
    }, {
      job: '保洁员',
      hotel_name: '希尔顿酒店'
    }, ]
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
    /* gql.query({
          query: `query {
            order_detail(
              pt_id: "${param}"
            ) {
              pt_info {
                avatar,
                name,
                gender,
                nickName,
                age,
                weight,
                height
              }
              job_count,
              job_hour,
              latest {
                job,
                hotel_name
              }
            }
          }`
        }).then((res) => {
          console.log('success', res);
        }).catch((error) => {
          console.log('fail', error);
        }); */
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
      phoneNumber: '111111111',
    })
  }

})