// pages/recite/recite.js
const app = getApp()
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
var DL, distance;
DL = require('../../utils/damerau-levenshtein.js');
distance = DL({}, false);
//var that = this
Page({
  data: {
    id: "",
   
    radio: 'K',
    variety: "0",
    xzt: {
      xA: '',
      xB: '',
      xC: '',
      sA: '',
      sB: '',
      sC: '',
      sD: '',
      xD: ''
    },
    qt: '',
    tid: 1,
    tall: 0,
    progress: 0,
    ptitle: "0/0",
    aws: '',
    contin: true,
    queding: "检测",
    uuu: '',
    tkt: {
      message: '',
      errors: "",
      show: false
    },
    jdt: {
      message: '',
      errors: "",
      show: false
    },
    pdt: {
      s1: "",
      s2: ""
    },
    dis: {
      done: false,
      wrnum: 0,
      wrid: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */

  fieldChangetkt(event) {
    this.setData({
      [`tkt.message`]: event.detail
    })
  },
  fieldChangejdt(event) {
    this.setData({
      [`jdt.message`]: event.detail
    })
  },
  onChanges: function(event) {
    //console.log(event)
    this.setData({
      radio: event.target.id
    })
  },
  randomsort: function(a, b) {
    return Math.random() > .5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  },
  chaos: function() {
    var a = ['A', 'B', 'C', 'D']
    a.sort(this.randomsort)
    return a
  },
  buhui: function() {
    var that = this
    if (this.data.contin) {
      wx.setStorageSync(this.data.id + ":tid", this.data.tid + 1) //记录背到了那个题
      switch (this.data.variety) {
        case "1":
          this.setData({
            [`xzt.s${this.data.aws}`]: "/images/right.png",
            [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
            [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
          })
          wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          break;
        case "2":
          this.setData({
            [`tkt.errors`]: "答案错误",
            [`tkt.show`]: true,
            [`tkt.message`]: " ",
            [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
            [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
          })
          wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          break;
        case "3":
          this.setData({
            [`pdt.s${this.data.aws}`]: "/images/right.png",
            [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
            [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
          })
          wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          break;
        case "4":
          this.setData({
            [`jdt.errors`]: "相似度：0%",
            [`jdt.show`]: true,
            [`jdt.message`]: " ",
            [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
            [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
          })
          wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          break;
      }
      this.setData({
        contin: false,
        queding: "继续",
        zzz: "margin:0;height:0;width:0;color:#f4f4f4;",
        uuu: "width:100%;"
      })
    } else {
      if (!done) {
        this.download()
      } else {
        this.setData({
          [`dis.done`]: true
        })
        this.isDone()
      }
    }
  },
  check: function() {
    var done = this.data.progress == 100
    //console.log(done)
    var judge = false;
    var that = this
    switch (this.data.variety) {
      case "1":
        var radio1 = this.data.radio
        if (radio1 == "K" && this.data.contin) {
          Notify({
            text: '请选择一个选项',
            backgroundColor: "#e74c3c"
          })
          return
        }
        this.setData({
          radio: "K"
        })
        break;
      case "2":
        if (this.data.tkt.message == "") {
          Notify({
            text: '请输入你的答案',
            backgroundColor: "#e74c3c"
          })
          return
        }
        break;
      case "3":
        var radio1 = this.data.radio
        if (radio1 == "K" && this.data.contin) {
          Notify({
            text: '请选择一个选项',
            backgroundColor: "#e74c3c"
          })
          return
        }
        this.setData({
          radio: "K"
        })
        break;
      case "4":
        if (this.data.jdt.message == "") {
          Notify({
            text: '请输入你的答案',
            backgroundColor: "#e74c3c"
          })
          return
        }
        break;
    }
    if (this.data.contin) {

      wx.setStorageSync(this.data.id + ":tid", this.data.tid + 1) //记录背到了那个题


      switch (this.data.variety) {
        case "1":
          if (this.data.aws != radio1) {
            this.setData({
              [`xzt.s${radio1}`]: "/images/wrong.png",
              [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
              [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
            })
            wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          }
          this.setData({
            [`xzt.s${this.data.aws}`]: "/images/right.png"
          })
          judge = this.data.aws == radio1
          break;
        case "2":
          if (this.data.tkt.message.toLowerCase() != this.data.aws.toLowerCase()) {
            this.setData({
              [`tkt.errors`]: "答案错误",
              [`tkt.show`]: true,
              [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
              [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
            })
            wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          } else {
            Notify({
              duration: 1000,
              text: '答案正确',
              backgroundColor: '#6ab04c'
            });
          }
          judge = this.data.tkt.message.toLowerCase() == this.data.aws.toLowerCase()
          break;
        case "3":
          if (this.data.aws != radio1) {
            this.setData({
              [`pdt.s${radio1}`]: "/images/wrong.png",
              [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
              [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
            })
            wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          }
          this.setData({
            [`pdt.s${this.data.aws}`]: "/images/right.png"
          })
          judge = this.data.aws == radio1
          break;
        case "4":
          var lv = distance(this.data.aws.toLowerCase(), this.data.jdt.message.toLowerCase())
          var dlvh = (1 - lv / this.data.aws.length).toFixed(4)
          console.log(dlvh)
          if (dlvh < 0.8) {
            this.setData({
              [`jdt.errors`]: "相似度：" + (dlvh * 100) + "%",
              [`jdt.show`]: true,
              [`dis.wrnum`]: this.data.dis['wrnum'] + 1,
              [`dis.wrid`]: this.data.dis['wrid'] + this.data.tid + ','
            })
            wx.setStorageSync(that.data.id + ":ct", this.data.dis.wrid)
          } else {
            Notify({
              duration: 1000,
              text: '答案正确，相似度：' + (dlvh * 100) + "%",
              backgroundColor: '#6ab04c'
            });
          }
          judge = dlvh > 0.8
          break;
      }

      if (judge) {
        if (!done) {
          this.setData({
            zzz: "margin:0;height:0;width:0;color:#f4f4f4;",
            uuu: "background-color: #E4E4E4;border-bottom: 3px solid #F6F6F6;color: #B0B0B0;width:100%;"
          })
          setTimeout(() => {
            this.download()
          }, 1000);
        } else {
          setTimeout(() => {
            this.setData({
              [`dis.done`]: true
            })
          }, 1000);
          this.isDone()
        }
      } else {
        this.setData({
          contin: false,
          queding: "继续",
          zzz: "margin:0;height:0;width:0;color:#f4f4f4;",
          uuu:"width:100%;"
        })
      }
    } else {
      if (!done) {

        this.download()
      } else {
        this.setData({
          [`dis.done`]: true
        })
        this.isDone()
      }
    }
  },
  isDone: function() {
    var that = this
    wx.setStorageSync(that.data.id + ":tid", 0)
    wx.removeStorage({
      key: that.data.id + ":ct"
    })
    if (this.data.dis["wrnum"] > 0) {

      this.uploadMistake()
      Dialog.alert({
        message: "本题库已答完，共做错" + this.data.dis["wrnum"] + "道题,继续努力"
      }).then(() => {
        wx.navigateBack({
          delta: 2 //小程序关闭当前页面返回上一页面
        })
      });

    } else {
      wx.setStorageSync(that.data.id + ":tid", 0)
      Dialog.alert({
        message: "本题库已答完，恭喜全对"
      }).then(() => {
        wx.navigateBack({
          delta: 2 //小程序关闭当前页面返回上一页面
        })
      });
    }

  },

  download: function() {
    if (this.data.tid < this.data.tall) {
      var that = this
      wx.getStorage({
        key: that.data.id,
        success: res => {
          var tid = that.data.tid
          res.data["question"] = res.data[tid]
          that.setData({
            tid: that.data.tid + 1
          })
          console.log(res.data["question"]["variety"])
          switch (res.data["question"]["variety"]) {
            case "1":
              that.xzt(res)
              break;
            case "2":
              that.tkt(res)
              break;
            case "3":
              that.pdt(res)
              break;
            case "4":
              that.jdt(res)
              break;
          }
        },
        fail: res => {
          wx.request({
            url: app.globalData.serverURL + '/finds/',
            method: "POST",
            data: {
              id: this.data.id,
              tid: this.data.tid + 1
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              //console.log(res,)
              if (res.data["status"] == 200) {
                switch (res.data["question"]["variety"]) {
                  case "1":
                    that.xzt(res)
                    break;
                  case "2":
                    that.tkt(res)
                    break;
                  case "3":
                    that.pdt(res)
                    break;
                  case "4":
                    that.jdt(res)
                    break;
                }
              } else {
                wx.showToast({
                  title: '参数错误',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          })

        }
      })
    } else {
      that.setData({
        tid: that.data.tid + 1
      })
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
              wx.setStorageSync(that.data.id, res.data['t'])
            }
          }
        })
      }
    })
  },

  uploadMistake: function() {
    if (this.data.dis.done) {
      var that = this
      wx.request({
        url: app.globalData.serverURL + '/error/' + app.globalData.openid,
        method: "POST",
        data: {
          id: this.data.id,
          misid: this.data.dis["wrid"]
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function(res) {
          //console.log(res)
        }
      })
    }
  },

  xzt: function(res) {
    //console.log(res)
    var that = this
    var k = parseInt(res.data["question"]["qid"] * 100 / that.data.tall).toString()
    var pt = res.data["question"]["qid"].toString() + "/" + that.data.tall.toString()
    var a = that.chaos()
    var b = ['A', 'B', 'C', 'D'].indexOf(res.data["question"]["aws"])
    that.setData({
      variety: "1",
      qt: res.data["question"]["qtitle"],
      [`xzt.x${a[0]}`]: res.data["question"]["A"],
      [`xzt.x${a[1]}`]: res.data["question"]["B"],
      [`xzt.x${a[2]}`]: res.data["question"]["C"],
      [`xzt.x${a[3]}`]: res.data["question"]["D"],
      tid: res.data["question"]["qid"],
      aws: `${a[b]}`,
      progress: k,
      ptitle: pt,
      [`xzt.sA`]: '/images/p.png',
      [`xzt.sB`]: '/images/p.png',
      [`xzt.sC`]: '/images/p.png',
      [`xzt.sD`]: '/images/p.png',
      contin: true,
      queding: "检测",
      uuu: "",
      zzz: ""
    })
  },
  tkt: function(res) {
    var k = parseInt(res.data["question"]["qid"] * 100 / this.data.tall).toString()
    var pt = res.data["question"]["qid"].toString() + "/" + this.data.tall.toString()
    var awsArr = res.data["question"]['aws']
    var awss = awsArr.join(" ")
    this.setData({
      variety: "2",
      qt: res.data["question"]["qtitle"],
      contin: true,
      queding: "检测",
      uuu: "",
      zzz: "",
      progress: k,
      ptitle: pt,
      tid: res.data["question"]["qid"],

      [`tkt.errors`]: "",
      [`tkt.show`]: false,
      [`tkt.message`]: "",
      aws: awss
    })
  },
  pdt: function(res) {
    var k = parseInt(res.data["question"]["qid"] * 100 / this.data.tall).toString()
    var pt = res.data["question"]["qid"].toString() + "/" + this.data.tall.toString()
    this.setData({
      variety: "3",
      qt: res.data["question"]["qtitle"],
      contin: true,
      queding: "检测",
      uuu: "",
      zzz: "",
      progress: k,
      ptitle: pt,
      tid: res.data["question"]["qid"],

      aws: res.data["question"]["aws"],
      [`pdt.s1`]: '/images/p.png',
      [`pdt.s2`]: '/images/p.png',
    })
  },
  jdt: function(res) {
    var k = parseInt(res.data["question"]["qid"] * 100 / this.data.tall).toString()
    var pt = res.data["question"]["qid"].toString() + "/" + this.data.tall.toString()
    this.setData({
      variety: "4",
      qt: res.data["question"]["qtitle"],
      contin: true,
      queding: "检测",
      uuu: "",
      zzz: "",
      progress: k,
      ptitle: pt,
      tid: res.data["question"]["qid"],

      [`jdt.errors`]: "",
      [`jdt.show`]: false,
      [`jdt.message`]: "",
      aws: res.data["question"]['aws']
    })
  },

  onLoad: function(options) {
    var that = this
    //wx.setStorageSync(, this.data.dis.wrid)

    this.setData({
      id: options.id
    })
    wx.getStorage({
      key: options.id + ":ct",
      success: res => {
        console.log(res, 2)
        that.setData({
          [`dis.wrid`]: res.data
        })
      }
    })

    wx.request({
      url: app.globalData.serverURL + '/find/',
      method: "POST",
      data: {
        id: options.id,
        tid: options.tid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (res.data["status"] == 200) {
          that.setData({
            tall: res.data["quesnum"]
          })
          wx.setStorageSync(that.data.id + ":tid", options.tid)
          //console.log(res)
          switch (res.data["question"]["variety"]) {
            case "1":
              that.xzt(res)
              break;
            case "2":
              that.tkt(res)
              break;
            case "3":
              that.pdt(res)
              break;
            case "4":
              that.jdt(res)
              break;
          }
          //wx.setStorageSync(that.data.id + ":tid", 1)
          that.gets()
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