// pages/h2-order/template-order/template-order.js
var gql = require('../../../utils/graphql.js')
import {
  $inToptip
} from '../../../components/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    type: 'workcontents',
    list: [],
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.type) {
      this.setData({
        type: options.type,
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
        mytemplate{
          ${this.data.type}{
            id
            ${this.data.type === 'workcontents' ? 'workcontent' : 'attention'}
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      if (this.data.type === 'workcontents') {
        for (let item of res.mytemplate.workcontents) {
          item.workcontent = decodeURI(item.workcontent)
        }
      } else {
        for (let item of res.mytemplate.attentions) {
          item.attention = decodeURI(item.attention)
        }
      }
      this.setData({
        list: this.data.type === 'workcontents' ? res.mytemplate.workcontents : res.mytemplate.attentions
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

  radioChange(e) {
    this.setData({
      value: e.detail.value
    })
  },

  doEdit: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/template-new/template-new?type=${this.data.type}&optiontype=${e.currentTarget.dataset.optiontype}&value=${e.currentTarget.dataset.value}&id=${e.currentTarget.dataset.id}`,
    })
  },

  doDelete: function(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success: res => {
        if (res.confirm) {
          gql.mutate({
            mutation: `mutation{
              deletetemplate(
                type:"${e.currentTarget.dataset.type}"
                id:"${e.currentTarget.dataset.id}"
              )
            }`
          }).then((res) => {
            console.log('success', res);
            wx.showToast({
              title: '删除成功'
            })
            this.onShow()
          }).catch((error) => {
            console.log('fail', error);
            wx.showToast({
              title: '删除失败'
            })
            this.onShow()
          });
        }
      }
    })
  },

  doSubmit: function() {
    if (!this.data.value) {
      $inToptip().show('请选择模板')
      return
    }
    wx.setStorageSync(this.data.type, this.data.value)
    wx.navigateBack({
      delta: 1
    })
  }

})