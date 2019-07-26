// pages/change/change.js
const app = getApp()
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  fieldChange(event) {
    //console.log(event)
    this.setData({
      [`${event.currentTarget.id}`]: event.detail
    })
  },
  onChange(event) {
    const {
      key
    } = event.currentTarget.dataset;
    this.setData({
      [key]: event.detail
    });
  },
  check: function() {
    var that = this,
      data = this.data,
      i,
      newsor = {}
    for (i in this.data.sor) {
      newsor[i] = this.data.sor[i];
    }
    newsor.qtitle = data.topic
    switch (this.data.variety) {
      case "1":
        newsor.aws = data.radio1
        newsor.A = data.xzt.A
        newsor.B = data.xzt.B
        newsor.C = data.xzt.C
        newsor.D = data.xzt.D
        //console.log(newsor, data.sor)
        var newstr = JSON.stringify(newsor)
        this.changeUpload(newstr)
        break;
      case "2":
        newsor.aws = data.tktaws.split(" ")
        var newstr = JSON.stringify(newsor)
        this.changeUpload(newstr)
        break;
      case "3":
        newsor.aws = parseInt(data.pdtaws)
        //console.log(newsor, data.sor)
        var newstr = JSON.stringify(newsor)
        //console.log(newstr, data.sor)
        this.changeUpload(newstr)
        break;
      case "4":
        newsor.aws = data.jdtaws
        //console.log(newsor, data.sor)
        var newstr = JSON.stringify(newsor)
        this.changeUpload(newstr)
        break;
    }
  },
  changeUpload: function(newstr) {
    var that = this,
      data = this.data
    if (newstr == JSON.stringify(data.sor)) {
      Notify({
        text: '你什么都没修改啊(半恼)',
        backgroundColor: "#e74c3c",
        duration: 1000
      })
    } else {
      Dialog.confirm({
        message: '是否修改？'
      }).then(() => {
        wx.request({
          url: app.globalData.serverURL + '/change',
          method: "POST",
          data: {
            id: data.id,
            tid: data.sor.qid,
            news: newstr,
            name: app.globalData.openid,
            mode: 2
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            if (res.data["errCode"] == "1") {
              Dialog.alert({
                message: '修改成功'
              }).then(() => {
                wx.removeStorage({
                  key: that.data.id,
                  success: function(res) {
                    that.gets()
                  },
                })
                let pages = getCurrentPages(); //当前页面
                let prevPage = pages[pages.length - 2]; //上一页面
                prevPage.setData({ //直接给上移页面赋值
                  sel: true
                });
                wx.navigateBack({
                  delta: 1
                })
              })
            }
          }
        })
      }).catch(() => {});
    }
  },
  gets: function() {
    var that = this
    // if (this.data.tid < this.data.tall) {
    wx.getStorage({
      key: that.data.id,
      fail: res => {
        wx.request({
          url: app.globalData.serverURL + '/gets/',
          method: "POST",
          data: {
            id: this.data.id,
            tid: 2
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            if (res.data["status"] == 200) {
              wx.setStorage({
                key: that.data.id,
                data: res.data['t'],
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var tid = parseInt(options.tid)
    console.log(options)
    wx.getStorage({
      key: options.id,
      success: function(res) {
        that.setData({
          id: options.id,
          sor: res.data[tid],
          topic: res.data[tid]["qtitle"],
          variety: res.data[tid]["variety"]
        })
        switch (res.data[tid]["variety"]) {
          case "1":
            that.setData({
              xzt: {
                A: res.data[tid]["A"],
                B: res.data[tid]["B"],
                C: res.data[tid]["C"],
                D: res.data[tid]["D"]
              },
              radio1: res.data[tid]["aws"]
            })
            break;
          case "2":
            var awsArr = res.data[tid]['aws']
            var awss = awsArr.join(" ")
            that.setData({
              tktaws: awss
            })
            break;
          case "3":
            that.setData({
              pdtaws: res.data[tid]["aws"].toString()
            })
            break;
          case "4":
            that.setData({
              jdtaws: res.data[tid]['aws']
            })
            break;
        }
        //console.log(res)
      },
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