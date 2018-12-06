



const app = getApp()

function getSearchMusic(keyword, pageindex, callbackcount, callback) {
  wx.request({
   // url: 'http://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    url: app.d.hostUrl + '/yqqApi/search',
    data: {
      // ct: 24,
      // qqmusic_ver: 1298,
      // new_json: 1,
      // remoteplace: 'txt.yqq.center',
      // searchid: '46985761142337179',
      // t: 0,
      // aggr: 1,
      // cr: 1,
      // catZhida: 1,
      // lossless: 0,
      // flag_qc: 0,
      // n: callbackcount,  //返回数据的个数
      // p: pageindex,
      // w: keyword,
      // g_tk: 5381,
      // jsonpCallback: 'MusicJsonCallback9444395810824562',
      // loginUin: 0,
      // hostUin: 0,
      // format: 'jsonp',
      // inCharset: 'utf8',
      // outCharset: 'utf-8',
      // notice: 0,
      // platform: 'yqq',
      // needNewCode: 0,
      // pcachetime: +new Date(),

      // g_tk: 5381,
      // uin: 0,
      // format: 'json',
      // inCharset: 'utf-8',
      // outCharset: 'utf-8',
      // notice: 0,
      // platform: 'yqq',
      // needNewCode: 1,
      // w: keyword,
      // zhidaqu: 1,
      // catZhida: 1,
      // t: 0,
      // flag: 1,
      // ie: 'utf-8',
      // sem: 1,
      // aggr: 0,
      // perpage: 20,
      // n: callbackcount,  //返回数据的个数
      // p: pageindex,
      // remoteplace: 'txt.mqq.all',
      // _: Date.now()

      callbackcount: callbackcount,  //返回数据的个数
      pageindex: pageindex,
      keyword: keyword,
    },
    method: 'GET',
    header: { 'content-Type': 'application/json'},
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}

function getMusicKey(songmid,callback){
  wx.request({
    url: app.d.hostUrl + '/yqqApi/getKey',
    data:{
      songmid:songmid
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      console.log(res)
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}

module.exports = {
  getSearchMusic: getSearchMusic,
  getMusicKey: getMusicKey
}
