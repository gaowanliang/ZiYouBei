// pages/share/share.js
var aes = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    loading: 0
  },
  load: function() {
    this.setData({
      loading: 1
    })
  },
  previewImage: function(e) {
    console.log(e)
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  check: function() {
    wx.navigateBack({
      delta: 2
    })
  },
  onLoad: function(options) {
    //console.log(JSON.stringify(options))
    var k = aes.encrypt(JSON.stringify(options)).replace(/\//g, "%2F").replace(/\+/g, "%2B").replace(/=/g, "%3D")
    //console.log(aes.decrypt(k), k)

    this.setData({
      url: "https://api.qrserver.com/v1/create-qr-code/?data=" + k
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