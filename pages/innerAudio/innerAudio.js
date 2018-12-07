// pages/innerAudio/innerAudio.js
var util = require('../../utils/musicUtil.js')
const innerAudioContext = wx.createInnerAudioContext()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:'http://y.gtimg.cn/music/photo_new/T002R300x300M000002eFUFm2XYZ7z.jpg?max_age=2592000', //封面图片
    islyric:true, //歌曲圆圈是否显示 默认显示
    lyricArr:[], //歌词
    isplaying:false, //按钮状态， 默认显示播放按钮
    currentTime:0, //当前音频播放位置 单位秒
    duration:0, //音频长度 单位秒
    songmid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    var purl = decodeURIComponent(res.purl)
    var songmid = res.songmid
    var songname = res.songname
    var author = res.author
    var albummid = res.albummid

    //是否自动播放
    innerAudioContext.autoplay = false
    //播放地址
    innerAudioContext.src = 'http://140.207.247.13/amobile.music.tc.qq.com/' + purl,
    //innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'

    this.setData({
      poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000' + albummid + '.jpg?max_age=2592000',
      duration:Math.floor(innerAudioContext.duration),
      songmid:songmid
    }),
    this.audioListen();
    var that = this;
    util.getMusicLyric(songmid,function(data){
      that.setData({
        lyricArr:data
      })
    })
  },

  //播放按钮
  audioPlay:function(){
    this.setData({
      isplaying: true,
    })
    innerAudioContext.play()
  },

  //暂停按钮
  audioPause:function(){
    this.setData({
      isplaying:false,
    })
    innerAudioContext.pause()
  },

  //图片页面 显示歌词
  showlyric:function(){
    this.setData({
      islyric:false
    })
  },
  //歌词页面 显示图片
  showCircle: function () {
    this.setData({
      islyric: true
    })
  },
  //滑动滑块
  sliderchange: function (e) {
    //获取滑动后的值
    console.log(e.detail.value);
    var per = e.detail.value / 100;
    var long = per * this.data.duration;
    
    innerAudioContext.seek(long);//通过滑块控制音频进度
  },
  //监控音频进度
  audioListen: function () {
    var that = this;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    //必须先执行onPlay方法，才能继续执行onTimeUpdate方法
    innerAudioContext.onTimeUpdate(function (res) {
      var per = (innerAudioContext.currentTime / innerAudioContext.duration) * 100;
      that.setData({
        currentTime: per
      })
    })
    
  }
})


// 时间格式化
function dateFormat(t) {
  let time = Math.floor(t / 60) >= 10 ? Math.floor(t / 60) : '0' + Math.floor(t / 60)
  t = time + ':' + ((t % 60) / 100).toFixed(2).slice(-2)
  return t
}
