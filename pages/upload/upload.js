// pages/upload/upload.js
var aes = require('../../utils/util.js')
const app = getApp()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    passwd: '',
    times: ''
  },
  rub: function() {
    wx.request({
      url: app.globalData.serverURL + '/rub/' + app.globalData.openid,
      method: "POST",
      data: {
        reg: this.data.passwd
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data == 200) {
          wx.navigateBack({
            delta: 1 //小程序关闭当前页面返回上一页面
          })
          wx.showToast({
            title: '销毁成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '参数错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  copy: function() {
    wx.setClipboardData({
      data: this.data.passwd,
      success(res) {}
    })
  },
  goup: function() {
    wx.setClipboardData({
      data: app.globalData.serverURL + '/upload/' + this.data.passwd,
      success(res) {
        wx.hideToast()
        wx.showToast({
          title: '复制上传网址成功，快去浏览器粘贴吧',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },


  scanQR: function() {
    var that=this
    wx.scanCode({
      success: res => {
        console.log(res)
        Dialog.confirm({
          message: "是否登录"
        }).then(() => {
          that.bb(res)
          setTimeout(() => {
            that.bb(res)
          }, 1000)
        })
      }
    })
  },

  bb: function(res) {
    wx.request({
      url: app.globalData.serverURL + '/socket/' + res.result,
      method: "POST",
      data: {
        name: app.globalData.openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */





  onLoad: function(options) {
    var timestamp = Date.parse(new Date())
    timestamp = timestamp / 1000
    var that = this
    wx.request({
      url: app.globalData.serverURL + '/act/' + app.globalData.openid,
      method: "POST",
      data: {
        reg: "" + timestamp,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        //console.log(res.data);
        // console.log(res);
        if (res.data.status == 200) {
          var text = aes.decrypt(res.data.reg) + ''
          var r = (parseInt((text.split("|"))[0]) + 1800 - Date.parse(new Date()) / 1000) / 60
          that.setData({
            passwd: res.data.reg,
            times: r.toFixed(0).toString()
          })
        }
      }
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

  }
})