// pages/h2-order/new-order/new-order.js
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
    orderid: 'default',
    order: '',
    items: [{
        name: '关闭',
        value: 0,
        checked: 'true'
      },
      {
        name: '开启',
        value: 1
      },
    ],
    form: {
      isFloat: 0,
      count: 0,
      male: 0,
      female: 0,
      salary: '',
      workcontent: '请选择工作内容的模板',
      attention: '请选择注意事项的模板'
    },
    isDisabled: false,
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
          hotel{
            hotelname
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let avatar = util.selectAvatar(res.search[0].originorder.occupation)
      util.formatItemOrigin(res.search[0])
      if (res.search[0].modifiedorder && res.search[0].modifiedorder.length > 0) {
        util.formatItemModify(res.search[0])
      }
      this.setData({
        order: res.search[0],
        ['form.count']: res.search[0].originorder.count,
        ['form.male']: res.search[0].originorder.male,
        ['form.female']: res.search[0].originorder.female,
        avatar: avatar
      })
      if (this.data.order.originorder.mode === 0) {
        if (Number(this.data.form.isFloat) === 1) {
          this.setData({
            ['form.count']: Math.ceil(this.data.form.count * 1.05)
          })
        }
      } else {
        if (Number(this.data.form.isFloat) === 1) {
          this.setData({
            ['form.male']: Math.ceil(this.data.form.male * 1.05),
            ['form.female']: Math.ceil(this.data.form.female * 1.05)
          })
        }
      }
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
    wx.getStorage({
      key: 'workcontents',
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            ['form.workcontent']: res.data
          })
        }
      },
    })
    wx.getStorage({
      key: 'attentions',
      success: res => {
        if (res.data.length > 0) {
          this.setData({
            ['form.attention']: res.data
          })
        }
      },
    })
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

  radioChange: function(e) {
    let data = this.data.order.originorder
    let isFloat = e.detail.value
    let tempCount = data.count
    let tempMale = data.male
    let tempFemale = data.female

    if (data.mode === 0) {
      if (Number(isFloat) === 1) {
        tempCount = Math.ceil(tempCount * 1.05)
      }
    } else {
      if (Number(isFloat) === 1) {
        tempMale = Math.ceil(tempMale * 1.05)
        tempFemale = Math.ceil(tempFemale * 1.05)
      }
    }

    this.setData({
      ['form.count']: tempCount,
      ['form.male']: tempMale,
      ['form.female']: tempFemale,
      ['form.isFloat']: isFloat
    })
  },

  iptSalary: function(e) {
    this.setData({
      ['form.salary']: e.detail.value
    })
  },

  doChooseTemp: function(e) {
    wx.navigateTo({
      url: `/pages/h2-order/template-order/template-order?type=${e.currentTarget.dataset.type}`,
    })
  },

  doSubmit: function(e) {
    let form = this.data.form
    if (!form.salary) {
      $inToptip().show('请输入用工单价')
      return
    }
    if (form.workcontent === '请选择工作内容的模板') {
      $inToptip().show('请选择工作内容')
      return
    }
    if (form.attention === '请选择注意事项的模板') {
      $inToptip().show('请选择注意事项')
      return
    }

    wx.showToast({
      title: '发布中',
      icon: 'loading',
      duration: 10000
    })
    this.setData({
      isDisabled: true
    })
    gql.mutate({
      mutation: `mutation {
        postorder(
          formid:"${e.detail.formId}"
          postorder: {
            orderid: "${this.data.orderid}"
            isfloat: ${Number(form.isFloat)}
            salary: ${Number(form.salary)}
            workcontent: "${encodeURI(form.workcontent)}"
            attention: "${encodeURI(form.attention)}"
          }
        ){
          error
        }
      }`
    }).then((res) => {
      console.log('success', res)
      this.setData({
        isDisabled: false
      })
      wx.redirectTo({
        url: `/pages/h2-order/prompt-success/prompt-success?orderid=${this.data.orderid}`,
      })
    }).catch((error) => {
      console.log('fail', error)
      wx.showToast({
        title: '发布失败',
        icon: 'none'
      })
      this.setData({
        isDisabled: false
      })
    });
  }

})