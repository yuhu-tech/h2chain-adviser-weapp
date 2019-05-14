// pages/h2-order/template-new/template-new.js
var gql = require('../../../utils/graphql.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'workcontents',
    optiontype: 'add',
    id: '',
    value: null,
    isDisabled: false
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type,
      optiontype: options.optiontype,
      value: options.value === 'undefined' ? null : options.value,
      id: options.id
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

  iptTemp: function(e) {
    this.setData({
      value: e.detail.value
    })
  },

  doSubmit: function() {
    this.setData({
      isDisabled: true
    })
    let value = encodeURI(this.data.value)
    if (this.data.optiontype === 'add') {
      gql.mutate({
        mutation: `mutation{
        createtemplate(
          type:"${this.data.type === 'workcontents' ? 'workcontent' : 'atention'}"
          value:"${value}"
        )
      }`
      }).then((res) => {
        console.log('success', res);
        wx.showToast({
          title: '添加成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }).catch((error) => {
        console.log('fail', error);
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
        this.setData({
          isDisabled: false
        })
      });
    } else {
      gql.mutate({
        mutation: `mutation{
        modifytemplate(
          id:"${this.data.id}"
          type:"${this.data.type === 'workcontents' ? 'workcontent' : 'atention'}"
          value:"${value}"
        )
      }`
      }).then((res) => {
        console.log('success', res);
        wx.showToast({
          title: '修改成功',
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      }).catch((error) => {
        console.log('fail', error);
        wx.showToast({
          title: '修改失败',
          icon: 'none'
        })
        this.setData({
          isDisabled: false
        })
      });
    }
  }

})