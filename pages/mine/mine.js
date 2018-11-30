// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
   
    wx.showModal({
      title:'提示',
      content: '确认刷新？',
      success: function(res){
        wx.showNavigationBarLoading() //在标题栏中显示加载
        if(res.confirm){
          wx.showToast({
            title: '刷新成功',
            duration:1000
          })
        }else{
          wx.showToast({
            title: '用户点击了取消',
            icon:'none',
            duration:1000
          })
        }
        wx.hideNavigationBarLoading() //在标题栏中隐藏加载
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //无法触发
    console.log('1231231231233')
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.showToast({
      title: '我是有底线的！',
      icon: 'success',
      duration: 2000
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})