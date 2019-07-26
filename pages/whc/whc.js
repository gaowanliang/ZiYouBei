// pages/whc/whc.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    done: true
  },
  onChange(event) {
    const {
      key
    } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: app.globalData.serverURL + '/checkerror/' + app.globalData.openid,
      method: "POST",
      data: {
        id: options.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data["status"] == 200) {
          that.setData({
            id: options.id,
            wrdata: res.data["wrdata"]
          })
        } else {
          that.setData({
            id: options.id,
            done: false
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