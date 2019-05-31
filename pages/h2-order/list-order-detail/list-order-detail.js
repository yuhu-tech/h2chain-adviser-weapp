// pages/h2-order/list-order-detail/list-order-detail.js
var gql = require('../../../utils/graphql.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: 'default',
    order_info: '',
    pt_list: [],
    pt_list_wait: [],
    pt_list_ing: [],
    multiArray: [
      ['自由报名', '顾问端分享', '代理端分享'],
      []
    ],
    multiIndex: [0, 0],
    ptname: '',
    agent_list: [],
    agentid_list: [],
    regMode: '',
    type: '',
    agentid: '',
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
    this.doSearch()
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
    wx.showNavigationBarLoading();
    this.setData({
      type: '',
      agentid: '',
      regMode: '',
      ptname: ''
    })
    this.doSearch()
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

  doSearch: function() {
    gql.query({
      query: `query {
        search(
          orderid: "${this.data.orderid}"
          ${this.data.ptname ? `ptname:"${this.data.ptname}"`:''}
          ${this.data.type?`type:${this.data.type}`:''}
          ${this.data.agentid?`inviterid:"${this.data.agentid}"`:''}
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
          pt{
            ptid
            ptorderstate
            name
            idnumber
            gender
            wechatname
            phonenumber
            worktimes
            workhours
            height
            weight
            remark{
              startdate
              enddate
              realsalary
              isworked
            }
          }
          agent{
            agentid
            name
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let temp_list = []
      let temp_ing = []
      let temp_wait = []
      let temp_name = []
      let temp_id = []
      let avatar = util.selectAvatar(res.search[0].originorder.occupation)
      util.formatItemOrigin(res.search[0])
      /* 处理时间 */
      if (res.search[0].modifiedorder.length > 0) {
        util.formatItemModify(res.search[0])
      }
      /* 处理PT */
      if (res.search[0].pt && res.search[0].pt.length > 0) {
        for (let item of res.search[0].pt) {
          if (item.remark) {
            let start = new Date(item.remark.startdate * 1000)
            let end = new Date(item.remark.enddate * 1000)
            item.duration = `${util.formatNumber(start.getHours())}:${util.formatNumber(start.getMinutes())}~${util.formatNumber(end.getHours())}:${util.formatNumber(end.getMinutes())}`
          }
          if (item.ptorderstate === 4) {
            temp_wait.push(item)
          } else if (item.ptorderstate === 3) {
            temp_ing.push(item)
          } else if (item.ptorderstate === 1) {
            temp_list.push(item)
          }
        }
      }
      /* 处理代理 */
      if (res.search[0].agent) {
        for (let item of res.search[0].agent) {
          temp_name.push(item.name)
          temp_id.push(item.agentid)
        }
      }
      if (temp_list.length === 0 && temp_ing.length === 0 && temp_wait.length === 0) {
        wx.showToast({
          title: '无结果',
          icon: 'none'
        })
      }
      this.setData({
        order_info: res.search[0],
        pt_list: temp_list,
        pt_list_wait: temp_wait,
        pt_list_ing: temp_ing,
        avatar: avatar,
        agent_list: temp_name,
        agentid_list: temp_id
      })
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    })
  },

  doCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.number
    })
  },

  doSearchName: function(e) {
    console.log(e)
    this.setData({
      ptname: e.detail.value
    })
    gql.query({
      query: `query {
        search(
          orderid:"${this.data.orderid}"
          ${e.detail.value ? `ptname: "${e.detail.value}"` : ''}
          ${this.data.type ? `type:${this.data.type}` : ''}
          ${this.data.agentid ? `inviterid:"${this.data.agentid}"` : ''}
        ) {
          pt{
            ptid
            ptorderstate
            name
            idnumber
            gender
            wechatname
            phonenumber
            worktimes
            workhours
            height
            weight
            remark{
              startdate
              enddate
              realsalary
              isworked
            }
          }
        }
      }`
    }).then((res) => {
      console.log('success', res);
      let temp_list = []
      let temp_ing = []
      let temp_wait = []
      if (res.search[0].pt && res.search[0].pt.length > 0) {
        for (let item of res.search[0].pt) {
          /* TODO */
          if (item.remark) {
            let start = new Date(item.remark.startdate * 1000)
            let end = new Date(item.remark.enddate * 1000)
            item.duration = `${util.formatNumber(start.getHours())}:${util.formatNumber(start.getMinutes())}~${util.formatNumber(end.getHours())}:${util.formatNumber(end.getMinutes())}`
          }
          /* ... */
          if (item.ptorderstate === 4) {
            temp_wait.push(item)
          } else if (item.ptorderstate === 3) {
            temp_ing.push(item)
          } else if (item.ptorderstate === 1) {
            temp_list.push(item)
          }
        }
      }
      if (temp_list.length === 0 && temp_ing.length === 0 && temp_wait.length === 0) {
        wx.showToast({
          title: '无结果',
          icon: 'none'
        })
      }
      this.setData({
        pt_list: temp_list,
        pt_list_wait: temp_wait,
        pt_list_ing: temp_ing
      })
    }).catch((error) => {
      console.log('fail', error);
      wx.showToast({
        title: '获取失败',
        icon: 'none'
      })
    });
  },

  goPtInfo: function(e) {
    wx.setStorageSync('pt_info', e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/h2-order/pt-info/pt-info',
    })
  },

  bindMultiPickerChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
    switch (this.data.multiIndex[0]) {
      case 0:
        this.setData({
          regMode: '自由报名',
          agentid: '',
          type: 1
        })
        break
      case 1:
        this.setData({
          regMode: '顾问端分享',
          agentid: '',
          type: 2
        })
        break
      case 2:
        this.setData({
          regMode: this.data.agent_list[this.data.multiIndex[1]],
          agentid: this.data.agentid_list[this.data.multiIndex[1]],
          type: 3
        })
        break
    }
    this.doSearch()
  },

  bindMultiPickerColumnChange(e) {
    let multiArray = this.data.multiArray;
    let multiIndex = this.data.multiIndex
    multiIndex[e.detail.column] = e.detail.value
    switch (e.detail.column) {
      case 0:
        switch (multiIndex[0]) {
          case 0:
            multiArray[1] = []
            break
          case 1:
            multiArray[1] = []
            break
          case 2:
            multiArray[1] = this.data.agent_list
            break
        }
        multiIndex[1] = 0
        break
      default:
        break
    }
    this.setData({
      multiArray: multiArray,
      multiIndex: multiIndex
    })
  },

  doIn: function(e) {
    wx.showModal({
      title: '确认',
      content: '继续参加？',
      success: res => {
        if (res.confirm) {
          gql.mutate({
            mutation: `mutation {
              modifyptoforder(
                orderid: "${this.data.orderid}"
                ptid:"${e.currentTarget.dataset.ptid}"
                ptstatus: 3
              )
            }`
          }).then(res => {
            wx.showToast({
              title: '操作成功'
            })
            setTimeout(() => {
              this.doSearch()
            }, 1000)
          }).catch(err => {
            console.log(err)
            wx.showToast({
              title: '操作失败',
              icon: 'none'
            })
          })
        }
      }
    })
  },

  doOut: function(e) {
    wx.showModal({
      title: '确认',
      content: '拒绝该PT？',
      success: res => {
        if (res.confirm) {
          gql.mutate({
            mutation: `mutation {
              modifyptoforder(
                orderid: "${this.data.orderid}"
                ptid:"${e.currentTarget.dataset.ptid}"
                ptstatus: 2
              )
            }`
          }).then(res => {
            wx.showToast({
              title: '操作成功'
            })
            setTimeout(() => {
              if (this.data.date) {
                this.doSearchDate()
              } else {
                this.doSearch()
              }
            }, 1000)
          }).catch(err => {
            console.log(err)
            wx.showToast({
              title: '操作失败',
              icon: 'none'
            })
          })
        }
      }
    })
  },

  doNote: function(e) {
    wx.setStorageSync('remark', e.currentTarget.dataset.item.remark)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/h2-order/list-order-note/list-order-note?orderid=${this.data.order_info.originorder.orderid}&ptid=${item.ptid}&salary=${this.data.order_info.postorder.salary}`,
    })
  }

})