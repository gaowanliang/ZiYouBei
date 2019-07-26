// pages/del/del.js
const app = getApp()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const that = this
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names: [],
    allinf: [],
    id: "",
    sel: false
  },

  onClosed(event) {
    var data = this.data,
      that = this
    //console.log(event)
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'left':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
          wx.request({
            url: app.globalData.serverURL + '/change',
            method: "POST",
            data: {
              id: data.id,
              tid: event.currentTarget.id,
              name: app.globalData.openid,
              mode: 3
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
                    key: data.id,
                    success: function(res) {
                      that.gets()
                    },
                  })
                })
              }
            }
          })
        }).catch(() => {
          instance.close();
        });
        break;
      case 'right':
        wx.navigateTo({
          url: '../change/change?id=' + this.data.id + "&tid=" + event.currentTarget.id,
        })
        instance.close();
        break;
    }
  },
  onClose(event) {

    //console.log(event, )
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'cell':
        instance.close();
        break;
      case 'left':
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
          this.del(event["target"]["id"])
        }).catch(() => {
          instance.close();
        });
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  del: function(op) {
    var that = this
    wx.request({
      url: app.globalData.serverURL + '/delt/' + app.globalData.openid,
      method: "POST",
      data: {
        id: op
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data == 200) {
          Dialog.alert({
            message: '操作成功'
          }).then(() => {
            that.onLoad()
          })
        }
      },
    })
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
              that.onLoad(that.data.option)
            }
          }
        })
      }
    })
  },


  onLoad: function(options) {
    var that = this
    if (typeof(options.id) == 'undefined') {
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
    } else {
      wx.getStorage({
        key: options.id,
        success: function(res) {
          that.setData({
            topic: res.data,
            id: options.id,
            option: options
          })
        },
        fail: res => {
          that.setData({
            id: options.id,
            option: options
          })
          that.gets()
        }
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
    if (this.data.sel == true) {
      this.setData({
        sel: false
      })
      this.onLoad(this.data.option)
    }
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