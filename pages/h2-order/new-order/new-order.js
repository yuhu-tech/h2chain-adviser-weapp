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
    template: []
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
      let temp = new Date(res.search[0].originorder.datetime * 1000)
      let tempdate = `${util.formatTime(temp).slice(0, 10)}`
      let tempHour = temp.getHours()
      let tempMinutes = util.formatNumber(temp.getMinutes())
      let tempTime = `${util.formatNumber(tempHour)}:${tempMinutes}~${util.formatNumber(tempHour + res.search[0].originorder.duration)}:${tempMinutes}`
      res.search[0].originorder.date = tempdate
      res.search[0].originorder.time = tempTime

      this.setData({
        order: res.search[0],
        ['form.count']: res.search[0].originorder.count,
        ['form.male']: res.search[0].originorder.male,
        ['form.female']: res.search[0].originorder.female
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
    /* content */
    wx.getStorage({
      key: 'content',
      success: res => {
        if (res.data.length > 0) {
          wx.getStorage({
            key: 'idx_content',
            success: idx => {
              let value = res.data[idx.data].content
              console.log(value)
              this.setData({
                ['form.workcontent']: value
              })
            },
            fail: err => {
              console.log('get idx of content fail, ' + err)
            }
          })
        } else {
          console.log('content is null')
        }
      },
      fail: err => {
        console.log('get content fail, ' + err)
      }
    })
    /* attention */
    wx.getStorage({
      key: 'attention',
      success: res => {
        if (res.data.length > 0) {
          wx.getStorage({
            key: 'idx_attention',
            success: idx => {
              let value = res.data[idx.data].content
              this.setData({
                ['form.attention']: value
              })
            },
            fail: err => {
              console.log('get idx of attention fail, ' + err)
            }
          })
        } else {
          console.log('attention is null')
        }
      },
      fail: err => {
        console.log('get attention fail, ' + err)
      }
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
      url: `/pages/h2-order/template-order/template-order?type=${e.currentTarget.dataset.type}&orderid=${this.data.orderid}`,
    })
  },

  doAddTemp: function() {
    this.data.template.push('test')
    let temp = this.data.template
    this.setData({
      template: temp
    })
    console.log(this.data.template)
    wx.setStorage({
      key: 'template',
      data: this.data.template,
    })
  },

  doSubmit: function() {
    let form = this.data.form
    if (!form.salary) {
      $inToptip().show('请输入用工单价')
      return
    }
    if (!form.workcontent) {
      $inToptip().show('请选择工作内容')
      return
    }
    if (!form.attention) {
      $inToptip().show('请选择注意事项')
      return
    }

    wx.showToast({
      title: '发布中',
      icon: 'loading',
      duration: 10000
    })

    gql.mutate({
      mutation: `mutation {
        postorder(
          postorder: {
            orderid: "${this.data.orderid}"
            isfloat: ${Number(form.isFloat)}
            salary: ${Number(form.salary)}
            workcontent: "${form.workcontent}"
            attention: "${form.attention}"
          }
        ){
          error
        }
      }`
    }).then((res) => {
      wx.redirectTo({
        url: '/pages/h2-order/prompt-success/prompt-success',
      })
    }).catch((error) => {
      console.log(error)
      wx.showToast({
        title: '发布失败',
        icon: 'none'
      })
    });
  }

})