// pages/management/management.js
const app = getApp()
Page({

  data: {
    active: 0,
    steps: [{
        text: '06.17 v1.0.6',
        desc: '加入登录提示；修复已知bug'
      }, {
        text: '06.09 v1.0.6',
        desc: '加入题库修改授权系统；修复已知bug'
      }, {
        text: '06.08 v1.0.5',
        desc: '加入修改题库题目功能；加入“不会”功能；修复若干bug'
      }, {
        text: '06.02 v1.0.4',
        desc: '加入实验性扫码登录上传网页功能；修复若干bug'
      },
      {
        text: '06.01 v1.0.3',
        desc: '升级答题界面：加入未背完继续选项'
      }, {
        text: '05.31 v1.0.2',
        desc: '升级答题界面：加入填空题、判断题、简答题，简答题使用Levenshtein算法判断对错'
      },
      {
        text: '05.31 v1.0.1',
        desc: '题库存储结构重构，接入填空题，判断题，简答题数据'
      },
      {
        text: '05.30 v1.0.1',
        desc: '网页端UI设计完成，使用reCAPTCHA保护上传安全'
      },
      {
        text: '05.27~29 v1.0.1',
        desc: '小程序端界面重构，使用Vant-WeApp丰富小程序控件'
      },
      {
        text: '05.26 v1.0.0',
        desc: '前后端大框架设计完成，具体设计太多，不再详述'
      },
      {
        text: '2019.05.16 v0.0.0',
        desc: '开始设计'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
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