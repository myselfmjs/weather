// pages/image/image.js
const app = getApp();
var arrayBase = [{
                    mode: 'scaleToFill',
                    text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
                  }, {
                      mode: 'aspectFit',
                      text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来'
                    }, {
                      mode: 'aspectFill',
                      text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来'
                    }, {
                      mode: 'top',
                      text: 'top：不缩放图片，只显示图片的顶部区域'
                    }, {
                      mode: 'bottom',
                      text: 'bottom：不缩放图片，只显示图片的底部区域'
                    }, {
                      mode: 'center',
                      text: 'center：不缩放图片，只显示图片的中间区域'
                    }, {
                      mode: 'left',
                      text: 'left：不缩放图片，只显示图片的左边区域'
                    }, {
                      mode: 'right',
                      text: 'right：不缩放图片，只显示图片的右边边区域'
                    }, {
                      mode: 'top left',
                      text: 'top left：不缩放图片，只显示图片的左上边区域'
                    }, {
                      mode: 'top right',
                      text: 'top right：不缩放图片，只显示图片的右上边区域'
                    }, {
                      mode: 'bottom left',
                      text: 'bottom left：不缩放图片，只显示图片的左下边区域'
                    }, {
                      mode: 'bottom right',
                      text: 'bottom right：不缩放图片，只显示图片的右下边区域'
                    }]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    array: arrayBase,
    json:'',
    src: 'http://img1.3lian.com/2015/w7/85/d/101.jpg'
    //src: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3569826787,303868460&fm=11&gp=0.jpg'
  },
  imageError: function (e) {
    console.log('image3发生error事件，携带值为', e.detail.errMsg)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var page = this;
    var arrayList = arrayBase
    arrayList.concat(arrayBase)
    page.setDate({
      array:arrayList
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("onReacBottom")
    var page = this;
    var base = {"mode": "bottom right",
      "text": "bottom right：不缩放图片，只显示图片的右下边区域"}
    var arrayList = arrayBase
    arrayList.concat(arrayBase)
    arrayList.push(base)
    wx.request({
      // url: 'https://imgstat.baidu.com/3.gif',
      // data:{
      //       pn: 0,
      //       personalized: 0,
      //       p: 57,
      //       q: '壁纸',
      //       avtag: '全部',
      //       tn: 'baiduimage',
      //       fcType: '',
      //       ie: 'utf-8',
      //       qpagetype: 0,
      //       userid: '',
      //       logid: '8290341292229260080',
      //       lsTime: new Date()
      //     },

      //本地localhost
      url: app.d.hostUrl +'/login/json',
      method: 'GET',
      header: {
        'content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          page.setData({
            json: res.data
          })
        }
      }
    })
    page.setData({
      array:arrayList
    })
  },

  //滚动到底部触发事件
  searchScrollLower: function () {
    console.log("触底了")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})