const app = getApp()
const aes = require('../../utils/util.js')
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({
  data: {
    names: [],
    allinf: [],
    haveTest: false,
    url: '',
    page: '',
    checked: false,
    minDate: Date.parse(new Date()),
    currentDate1: Date.parse(new Date()),
    permissions: false,
    perstr: "我是授权人",
    perjudge: true,
    perd: "如果你是被授权者，请把这个选项关掉",
    loading: 0,
    url: "",
    qx: true
  },
  tanslate(event) {
    // console.log(event)
    if (event.currentTarget.id == "A") {
      if (!event.detail) {
        var o = "我是被授权者",
          k = "如果你是授权人，请把这个选项打开"
      } else {
        var o = "我是授权人",
          k = "如果你是被授权者，请把这个选项关掉"
      }
      this.setData({
        perjudge: event.detail,
        perstr: o,
        perd: k
      })
    } else {
      this.setData({
        qx: event.detail
      })
    }

  },
  load: function() {
    this.setData({
      loading: 1
    })
    wx.stopPullDownRefresh()
  },
  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },
  onInput(event) {
    const {
      detail,
      currentTarget
    } = event;


    //const result = this.getResult(detail, currentTarget.dataset.type);
    this.setData({
      dada: aes.formatTime(new Date(detail)),
      dadada: detail
    });
    //console.log(result)
  },
  onConfirm(event) {
    var that = this
    if (this.data.haveTest == true) {
      const {
        picker,
        value,
        index
      } = event.detail
      var ins = parseInt(`${index}`)
      var page1 = this.data.page
      var dadada = this.data.dadada
      if (this.data.checked == false) {
        dadada = 999999900000 + Date.parse(new Date())
      }
      if (page1 == "share") {
        //console.log()
        if (dadada > Date.parse(new Date())) {
          wx.navigateTo({
            url: '../' + page1 + '/' + page1 + "?date=" + dadada + '&id=' + this.data.allinf[ins]["id"],
          })
        } else {
          wx.showToast({
            title: '你选择的时间小于当前时间，请重新选择',
            icon: "none",
            time: 2000
          })
        }
      } else if (page1 == "recite") {
        wx.getStorage({
          key: that.data.allinf[ins]["id"] + ":tid",
          success: res => {
            console.log(res.data)
            if (res.data > 1) {
              Dialog.confirm({
                title: "是否继续",
                message: '检测到你上一次背诵到第' + res.data + "题，是否继续"
              }).then(() => {
                wx.navigateTo({
                  url: '../' + page1 + '/' + page1 + '?id=' + that.data.allinf[ins]["id"] + '&tid=' + res.data,
                })
              }).catch(() => {
                wx.removeStorage({
                  key: that.data.allinf[ins]["id"] + ":ct"
                })
                wx.navigateTo({
                  url: '../' + page1 + '/' + page1 + '?id=' + that.data.allinf[ins]["id"] + '&tid=1',
                })
              });
            } else {
              wx.removeStorage({
                key: that.data.allinf[ins]["id"] + ":ct"
              })
              wx.navigateTo({
                url: '../' + page1 + '/' + page1 + '?id=' + that.data.allinf[ins]["id"] + '&tid=1',
              })
            }
          },
          fail: res => {
            wx.removeStorage({
              key: that.data.allinf[ins]["id"] + ":ct"
            })
            wx.navigateTo({
              url: '../' + page1 + '/' + page1 + '?id=' + that.data.allinf[ins]["id"] + '&tid=1',
            })
          }
        })
      } else if (page1 == "del") {
        wx.request({
          url: app.globalData.serverURL + '/change',
          method: "POST",
          data: {
            name: app.globalData.openid,
            id: that.data.allinf[ins]["id"],
            mode: 1
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            //console.log(res.data)
            if (res.data.errCode != 1) {
              Dialog.alert({
                message: res.data.errMsg
              }).then(() => {})
            } else {
              wx.navigateTo({
                url: '../' + page1 + '/' + page1 + '?id=' + that.data.allinf[ins]["id"],
              })
            }
          }
        })
      } else if (page1 == "permissions") {
        wx.request({
          url: app.globalData.serverURL + '/change',
          method: "POST",
          data: {
            name: app.globalData.openid,
            id: that.data.allinf[ins]["id"],
            mode: 3,
            sqxx: ""
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            //console.log(res.data)
            if (res.data.errCode != 1) {
              Dialog.alert({
                message: res.data.errMsg
              }).then(() => {})
            } else {
              wx.scanCode({
                success: res => {
                  var old = aes.decrypt(res.result),
                    arr = old.split("|"),
                    timestamp = Date.parse(new Date()) / 1000
                  console.log(parseInt(arr[0]), timestamp)
                  if (that.data.qx) {
                    var ok = arr[1]
                  } else {
                    var ok = arr[1] + ":2"
                  }
                  if (parseInt(arr[0]) > timestamp) {
                    wx.request({
                      url: app.globalData.serverURL + '/change',
                      method: "POST",
                      data: {
                        name: app.globalData.openid,
                        id: that.data.allinf[ins]["id"],
                        mode: 3,
                        sqxx: ok
                      },
                      header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                      success: function(res) {
                        Dialog.alert({
                          message: "大成功"
                        })
                      }
                    })
                  } else {
                    Dialog.alert({
                      message: "这个授权码超时了"
                    })
                  }
                }
              })
            }
          }
        })

      } else {
        wx.navigateTo({
          url: '../' + page1 + '/' + page1 + '?id=' + this.data.allinf[ins]["id"],
        })
      }

    }
  },
  onCancel() {
    wx.navigateBack({
      delta: 1 //小程序关闭当前页面返回上一页面
    })
  },
  refresh: function() {
    var that = this
    wx.request({
      url: app.globalData.serverURL + '/register',
      method: "POST",
      data: {
        name: app.globalData.openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 1000
          })
          app.globalData.test = res.data.test
          if (JSON.stringify(app.globalData.test) != '[]') { //判断对象是否为空
            var k = []
            for (var i = 0; i < app.globalData.test.length; i++) {
              k.push(app.globalData.test[i]['qn'])
            }
            that.setData({
              names: k,
              allinf: app.globalData.test,
              haveTest: true
            })
          } else {
            wx.navigateBack({
              delta: 1 //小程序关闭当前页面返回上一页面
            })
            wx.showToast({
              title: '你还没有任何题库，快去添加吧!',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: '刷新失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },
  onLoad: function(option) {
    //console.log(option, 1)
    if (option.page != '') {
      this.setData({
        page: option.page
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
    if (option.page == 'permissions') {
      var timestamp = Date.parse(new Date()) / 1000 + 60,
        k = aes.encrypt(timestamp + "|" + app.globalData.openid).replace(/\//g, "%2F").replace(/\+/g, "%2B").replace(/=/g, "%3D")
      //console.log(k)
      this.setData({
        permissions: true,
        url: "https://api.qrserver.com/v1/create-qr-code/?data=" + k
      })
    }
    var that = this
    // console.log(app.globalData.test)
    if (JSON.stringify(app.globalData.test) != '[]') { //判断对象是否为空
      var k = []
      for (var i = 0; i < app.globalData.test.length; i++) {
        k.push(app.globalData.test[i]['qn'])
      }
      this.setData({
        names: k,
        allinf: app.globalData.test,
        haveTest: true
      })
      // console.log(this.data.names.length)
    } else {
      wx.navigateBack({
        delta: 1 //小程序关闭当前页面返回上一页面
      })
      wx.showToast({
        title: '你还没有任何题库，快去添加吧!',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onPullDownRefresh: function() {
    if (this.data.perjudge) {
      this.refresh()
      setTimeout(() => {
        wx.stopPullDownRefresh()
      }, 500)
    } else {
      var timestamp = Date.parse(new Date()) / 1000 + 1000,
        k = aes.encrypt(timestamp + "|" + app.globalData.openid).replace(/\//g, "%2F").replace(/\+/g, "%2B").replace(/=/g, "%3D")
      this.setData({
        url: "https://api.qrserver.com/v1/create-qr-code/?data=" + k,
        loading: 0
      })
    }
  }
})