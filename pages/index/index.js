//index.js
//获取应用实例
const app = getApp()
var aes = require('../../utils/util.js')
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({
  data: {
    //motto: ['Hello World', "yeah"],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    hasopenidInfo: false
  },
  //事件处理函数
  nto: function(event) {
    console.log(event)
    if (event.currentTarget.id == "upload") {
      wx.navigateTo({
        url: '../upload/upload',
      })
    } else {
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
            app.globalData.test = res.data.test
            if (JSON.stringify(app.globalData.test) != '[]') { //判断对象是否为空
              var k = []
              for (var i = 0; i < app.globalData.test.length; i++) {
                k.push(app.globalData.test[i]['qn'])
              }
              console.log(event["target"]['id'], '../switch/switch?page=' + event["target"]['id'])
              wx.navigateTo({
                url: '../switch/switch?page=' + event["target"]['id']
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
          }
        },
      })
    }
  },
  scanQR: function() {
    wx.scanCode({
      success: res => {
        var ress = JSON.parse(aes.decrypt(res.result))
        if (ress["date"] > Date.parse(new Date())) {
          wx.request({
            url: app.globalData.serverURL + '/share/' + app.globalData.openid,
            method: "POST",
            data: {
              qid: ress["id"],
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              console.log(res)
              if (res.data['status'] == 200) {
                Dialog.alert({
                  message: res.data['describe']
                }).then(() => {
                  // on close
                });
              } else {
                Dialog.alert({
                  message: "你扫描的不是题库二维码，请重新试试吧"
                }).then(() => {
                  // on close
                });
              }
            }
          })
        } else {
          Dialog.alert({
            message: "这个分享码过期了"
          }).then(() => {
            // on close
          });
        }
      }
    })
  },

  connect: function() {
    Toast.loading({
      mask: true,
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '登录中...'
    });
    wx.login({
      success: res => {
        wx.request({
          url: app.globalData.serverURL + '/a',
          method: "POST",
          data: res,
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function(res) {
            app.globalData.openid = res.data
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
                //console.log(res.data);
                // console.log(res);
                if (res.data.status == 200) {
                  that.setData({
                    hasopenidInfo: true
                  })
                  Toast.clear();
                  wx.showToast({
                    title: '登录成功',
                    icon: 'success',
                    duration: 2000
                  })
                  // console.log(res.data.test)
                  if (res.data.test != '[]') {
                    var text = res.data.test + ''
                    app.globalData.test = res.data.test
                  }
                } else {
                  Toast.clear();
                  wx.showToast({
                    title: '登录失败，请稍后重试',
                    icon: 'none',
                    duration: 2000
                  })
                }
              },
            })
          },
          fail: res => {
            Toast.clear();
            wx.showToast({
              title: '登录失败，请稍后重试',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
  onLoad: function() {
    Toast.loading({
      mask: true,
      duration: 0, // 持续展示 toast
      forbidClick: true, // 禁用背景点击
      message: '登录中...'
    });
    var that = this
    if (app.globalData.openid == "") {
      wx.login({
        success: res => {
          wx.request({
            url: app.globalData.serverURL + '/a',
            method: "POST",
            data: res,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              app.globalData.openid = res.data
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
                  //console.log(res.data);
                  // console.log(res);
                  if (res.data.status == 200) {
                    that.setData({
                      hasopenidInfo: true
                    })
                    Toast.clear();
                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000
                    })
                    // console.log(res.data.test)
                    if (res.data.test != '[]') {
                      var text = res.data.test + ''
                      app.globalData.test = res.data.test
                    }
                  } else {
                    Toast.clear();
                    wx.showToast({
                      title: '登录失败，请稍后重试',
                      icon: 'none',
                      duration: 2000
                    })

                  }
                },
                fail: res => {
                  Toast.clear();
                  wx.showToast({
                    title: '登录失败，请稍后重试',
                    icon: 'none',
                    duration: 2000
                  })
                }
              })
            }
          })
          //console.log(res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.login({
        success: res => {
          wx.request({
            url: this.globalData.serverURL + '/a',
            method: "POST",
            data: res,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              that.globalData.openid = res.data
              wx.request({
                url: that.globalData.serverURL + '/register',
                method: "POST",
                data: {
                  name: that.globalData.openid,
                },
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(res) {
                  //console.log(res.data);
                  // console.log(res);
                  if (res.data.status == 200) {
                    Toast.clear();
                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000
                    })
                    // console.log(res.data.test)
                    if (res.data.test != '[]') {
                      var text = res.data.test + ''
                      that.globalData.test = res.data.test
                    }
                  } else {
                    Toast.clear();
                    wx.showToast({
                      title: '登录失败，请稍后重试',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                },
              })
            },
            fail: res => {
              Toast.clear();
              wx.showToast({
                title: '登录失败，请稍后重试',
                icon: 'none',
                duration: 2000
              })
            }
          })
          //console.log(res)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
        //console.log(res.data);
        // console.log(res);
        if (res.data.status == 200) {
          Toast.clear();
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })
          // console.log(res.data.test)
          if (res.data.test != '[]') {
            var text = res.data.test + ''
            app.globalData.test = res.data.test
          }
        } else {
          Toast.clear();
          wx.showToast({
            title: '登录失败，请稍后重试',
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },
  onShow: function() {
    this.setData({
      show: true
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.setData({
      show: false
    })

  },
})
/*
https://imgchr.com/i/A7FuYd
https://imgchr.com/i/A7FKfA
https://imgchr.com/i/A7FQSI
*/