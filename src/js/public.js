import 'babel-polyfill';
import CONFIG,{XHR} from './XHR';
var shareArr=[];
//转换时间函数
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
} ;
//转换long型为日期字符串
function getFormatDateByLong(l, pattern) {
    return getFormatDate(new Date(l), pattern);
}
//转换日期对象为日期字符串
function getFormatDate(date, pattern) {
    if (date == undefined) {
        date = new Date();
    }
    if (pattern == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    }
    return date.format(pattern);
}
function getSmpFormatDate(date, isFull) {
    var pattern = "";
    if (isFull == true || isFull == undefined) {
        pattern = "yyyy-MM-dd hh:mm:ss";
    } else if(isFull==2){
        pattern = "yyyy-MM-dd hh:mm";
    } else if(isFull==5){
        pattern = "hh:mm";
    } else if(isFull==6){
        pattern = "yyyy-MM";
    }
    else {
        pattern = "yyyy-MM-dd";
    }
    return getFormatDate(date, pattern);
}

const PUBLIC={
    /*默认图*/
    defaultImg:'http://cdn.genwoshua.com/gendefaultlogo.jpg',
    loadErrImg:'http://cdn.genwoshua.com/loaderr.jpg',
    defaultShopImg:'http://cdn.genwoshua.com/shop_default.png',
    defaultPreLoadImg:'http://cdn.genwoshua.com/defaultpreload.jpg',
    shopcarEmptyImg:'http://cdn.genwoshua.com/order_icon_order_none@2x.png',
    bonusEmptyImg:'http://cdn.genwoshua.com/fuli_img_nonefuli.png',
    productshortage:'就那么几件啦',
    ourName:'跟我耍乡村休闲自驾周边游',
    ourSlogan:'慢生活轻旅游,跟我一起乡村游',
    copyright:'本服务由成都市跟我耍乡村休闲自驾周边游提供',
    focusLink:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxOTc1OTU3Mg==&scene=124#wechat_redirect',
    cropImg:function(w,h){
        return '?imageMogr2/thumbnail/!'+w*2+'x'+h*2+'r/gravity/Center/crop/'+w*2+'x'+h*2;
    },
     /*
        时间戳转换
    */
    getSmpFormatDateByLong:function(date, isFull){
        if(date=='' || date==null){
            return
        }
        if(typeof(date)=='string'){
            return date
        }
        return getSmpFormatDate(new Date(date), isFull);
    },
     isArray:function(arg) {
        if (typeof arg === 'object') {
            return Object.prototype.toString.call(arg) === '[object Array]';
        }
        return false;
    },
    /*
    * 将手机号中间的数字用****代替
    * */
    HandlePhone:function (value) {
        var newPhone='';
        if(value && value.length==11){
            newPhone=value.substr(0, 3) + '****' + value.substr((value.length) - 4, 5);
        }else if(value){
            newPhone=value;
        }
        return newPhone;
    },
    /*
    * 转换价格为两位小数
    * */
     transformCharge:function(numberCharge) {
        var charge=numberCharge+'';
        var finalCharge=0;
        if(charge){
            if(charge.toString().split('.')[1] && charge.toString().split('.')[1].length>0){
                var decimal=charge.toString().split('.')[1];
                if(decimal.length>2){
                    finalCharge=charge.toString().split('.')[0]+'.'+charge.toString().split('.')[1].substr(0,2)
                }else if(decimal.length==2){
                    finalCharge=charge;
                }else if(decimal.length==1){
                    finalCharge=charge.toString().split('.')[0]+'.'+decimal+'0'
                }
            }else{
                if(charge.toString().indexOf('.')>0){
                    finalCharge=charge.toString()+'00';
                }else{
                    finalCharge=charge.toString()+'.00';
                }

            }
            return finalCharge
        }else{
            return finalCharge
        }

    },
    /*
        收货地址
    */
    getCurrentUserAddress: function(){
        let useraddress=[];
        try{
            const res= XHR(CONFIG.baseUrl+CONFIG.alphaPath.checkUserAddress,{},'get').then((res)=>{
                useraddress=res
            })
            
        }catch(err){
            // console.log('请求用户收货地址异常');
        }finally{
            return useraddress
        }
    },

    /*
    将毫秒时间差转换成小时,分
    */
    changeTimestrToHour:function(timestap){
        let now=Date.now();
        let timegap=timestap-now;
        if(timegap>0){
            let hour=Math.floor(timegap/3600000);
            let minitue=Math.ceil((timegap-hour*3600000)/60000);
            return hour+'小时'+minitue+'分';
        }else{
            return '已过期'
        }
        
    },
    /*
    redirect from wechat
    */
    RedirectToGen:function(){
        let locationHref=window.location.href;
        window.location.href='http://'+window.location.host+'/alpha/api/wechat/login?url='+encodeURIComponent(locationHref);
    },
    /*
    getUserFromServer
    */
    getUserFromServer:async function(){
        let thisObj=this;
        let userLogined=false;
        try{
          const res=  await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userlogin,{},'get');
            if(res && res.openid){
                console.log(res)
                window.sessionStorage.user=JSON.stringify(res);
                userLogined=true;
                // window.location.reload();
            }else{
                console.log('start redirect')
                PUBLIC.RedirectToGen();
            }
        }catch(err){
            console.log('start redirect')
            PUBLIC.RedirectToGen();
        }finally{
            return userLogined
        }

    },
    JustGetUserStatus:async function(){
        let userLogined=false;
        try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userlogin,{},'get');
            if(res && res.openid){
                userLogined=true;
                window.sessionStorage.user=JSON.stringify(res);
                window.localStorage.user=JSON.stringify(res);
            }else{
                if(window.sessionStorage.user && JSON.parse(window.sessionStorage.user).openid){
                    userLogined=await PUBLIC.SilentLogin(JSON.parse(window.sessionStorage.user).openid)
                }else if(window.localStorage.user && JSON.parse(window.localStorage.user).openid){
                    userLogined=await PUBLIC.SilentLogin(JSON.parse(window.localStorage.user).openid)
                }
            }
        }
        finally{
            return userLogined
        }
        
    },
    LoadUser:async function(para){
        let userLogined=false;
        try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userlogin,{},'get');
            if(res && res.openid){
                window.sessionStorage.user=JSON.stringify(res);
                window.localStorage.user=JSON.stringify(res);
                userLogined=true;
            }else{
                // if(para && para=='silentlogin'){
                    if(window.sessionStorage.user && JSON.parse(window.sessionStorage.user).openid){
                        userLogined=await PUBLIC.SilentLogin(JSON.parse(window.sessionStorage.user).openid)
                    }else if(window.localStorage.user && JSON.parse(window.localStorage.user).openid){
                        userLogined=await PUBLIC.SilentLogin(JSON.parse(window.localStorage.user).openid)
                    }
                    else{
                        PUBLIC.RedirectToGen();
                    }
                // }else{
                //     PUBLIC.RedirectToGen();
                // }
                
            }
        }
        catch(err){
            PUBLIC.RedirectToGen();
            
        }
        finally{
            return userLogined
        }
    },
    SilentLogin:async function(openid){
        let userLogined=false;
        try{
            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.silentLogin,{'userName':openid},'get');
            if(res && res.openid){
                window.sessionStorage.user=JSON.stringify(res);
                window.localStorage.user=JSON.stringify(res);
                userLogined=true;
            }else{
                PUBLIC.RedirectToGen();
            }
        }catch(err){
            PUBLIC.RedirectToGen();
        }finally{
            return userLogined
        }
    },
    wxSetTitle:function(title) {
        document.title = title;
        var mobile = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            var iframeCallback = function() {
                setTimeout(function() {
                    iframe.removeEventListener('load', iframeCallback);
                    document.body.removeChild(iframe);
                }, 0);
            };
            iframe.addEventListener('load', iframeCallback);
            document.body.appendChild(iframe);
        }
    },
    wxUserSign:async function(pagename){
        for(let i=0;i<shareArr.length;i++){
            if(shareArr[i]==pagename || '/'+shareArr[i]=='/'+pagename || '/'+shareArr[i]==pagename || shareArr[i]=='/'+pagename){
                return
            }
        }
        shareArr.push(pagename);
        try{
           const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.userSign,window.location.href,'post');
            if(!PUBLIC.isWechat()){
                return
            }else{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature, // 必填，签名，见附录1
                    jsApiList: ['openLocation', 'getLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'previewImage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function() {
                    window.sessionStorage.WechatSupport='ok';
                    // onWechatReady();
                    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                    // if (shareObject != null) {
                    //     wx.onMenuShareAppMessage(shareObject);
                    //     wx.onMenuShareTimeline(shareObject);
                    // }
                    PUBLIC.shareGen();
                    
                });
                wx.error(function(result) {
                    window.sessionStorage.WechatSupport='error';
                    console.log('wechat init failed');
                    console.log(result);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                });
            }
        }catch(err){
            window.sessionStorage.WechatSupport='error';
        }finally{
        
        }
    },
    shareObj:{
        'play':'RSharePlay',
        'mall':'RShareMall',
        'product':'RShareProduct',
        'theme':'RShareTheme',
        'shop':'RShareShop',
        'welfare':'RShareWelfare',
    },
    shareGen:function(){
        
        let shareObj=PUBLIC.getCurrentShareObj('normal');
        let shareObj1=PUBLIC.getCurrentShareObj('friend');
        wx.onMenuShareAppMessage(shareObj);//分享给朋友
        wx.onMenuShareTimeline(shareObj1);//分享到朋友圈
        wx.onMenuShareQQ(shareObj);//分享到QQ
        wx.onMenuShareWeibo(shareObj);//分享到腾讯微博
        wx.onMenuShareQZone(shareObj);//分享到QQ空间
    },
    getCurrentShareObj:function(shareType) {
            var shareObj={type:'link',dataUrl:''};
            if(window.sessionStorage.ShareName){
                let ShareName=window.sessionStorage.ShareName;
                if(ShareName==PUBLIC.shareObj.play){
                    if(shareType!='friend'){
                        shareObj.desc='慢生活 轻旅游  跟我一起乡村游';
                    }
                    shareObj.title='成都市跟我耍乡村休闲自驾周边游';
                    shareObj.imgUrl=PUBLIC.defaultImg;
                    shareObj.link='http://'+window.location.host+'/#/play';

                }else if(ShareName==PUBLIC.shareObj.theme){
                    if(shareType!='friend'){
                        shareObj.desc=JSON.parse(window.sessionStorage.ThemeObj).simpleDesc;
                    }
                    shareObj.title=JSON.parse(window.sessionStorage.ThemeObj).name;
                    shareObj.imgUrl=JSON.parse(window.sessionStorage.ThemeObj).imgurl ? JSON.parse(window.sessionStorage.ThemeObj).imgurl : PUBLIC.defaultImg;
                    shareObj.link=window.location.href;
                }else if(ShareName==PUBLIC.shareObj.mall){
                    if(shareType!='friend'){
                        shareObj.desc='慢生活 轻旅游  跟我一起乡村游';
                    }
                    shareObj.title='成都市跟我耍乡村休闲自驾周边游';
                    shareObj.imgUrl=PUBLIC.defaultImg;
                    shareObj.link='http://'+window.location.host+'/#/mall';
                }else if(ShareName==PUBLIC.shareObj.product){
                    if(shareType!='friend'){
                        // shareObj.desc=JSON.parse(window.sessionStorage.shopObj).highlight;
                        if(JSON.parse(window.sessionStorage.productObj).slogan){
                            shareObj.desc=JSON.parse(window.sessionStorage.productObj).slogan;
                        }else{
                            shareObj.desc='这个看起来很好玩，要不要一起去玩啊';
                        }

                    }
                    shareObj.title=JSON.parse(window.sessionStorage.productObj).title;
                    shareObj.imgUrl=JSON.parse(window.sessionStorage.productObj).imgurl ? JSON.parse(window.sessionStorage.productObj).imgurl : PUBLIC.defaultImg;
                    if(window.sessionStorage.user && JSON.parse(window.sessionStorage.user).id){
                        shareObj.link=window.location.href+'&gd='+JSON.parse(window.sessionStorage.user).id;
                    }else if(window.localStorage.user && JSON.parse(window.localStorage.user).id){
                        shareObj.link=window.location.href+'&gd='+JSON.parse(window.localStorage.user).id;
                    }else{
                        shareObj.link=window.location.href;
                    }
                    shareObj.success=async function(){
                        if(window.sessionStorage.user && JSON.parse(window.sessionStorage.user).id){
                            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.shareSave,{'userId':JSON.parse(window.sessionStorage.user).id,'productId':JSON.parse(window.sessionStorage.productObj).productId},'post');
                        }else if(window.localStorage.user && JSON.parse(window.localStorage.user).id){
                            const res=await XHR(CONFIG.baseUrl+CONFIG.alphaPath.shareSave,{'userId':JSON.parse(window.localStorage.user).id,'productId':JSON.parse(window.sessionStorage.productObj).productId},'post');
                        }
                        
                    }
                    
                }else if(ShareName==PUBLIC.shareObj.shop){
                    if(shareType!='friend'){
                        if(JSON.parse(window.sessionStorage.shopObj).id && JSON.parse(window.sessionStorage.shopObj).id==29){
                            shareObj.desc='著名演员赵亮的农庄，离尘世很远，离城市很近';
                        }else{
                            shareObj.desc='发现一个好玩的地方，推荐你去玩哦';
                        }
                        
                    }
                    shareObj.title=JSON.parse(window.sessionStorage.shopObj).title;
                    shareObj.imgUrl=JSON.parse(window.sessionStorage.shopObj).imgurl ? JSON.parse(window.sessionStorage.shopObj).imgurl : PUBLIC.defaultImg;
                    if(JSON.parse(window.sessionStorage.shopObj).showpro && JSON.parse(window.sessionStorage.shopObj).showpro==1){
                        shareObj.link=window.location.href+'&showpro=1';
                    }else{
                        shareObj.link=window.location.href;
                    }
                    
                }else if(ShareName==PUBLIC.shareObj.welfare){
                    if(shareType!='friend'){
                        if(shareType!='friend'){
                            if(JSON.parse(window.sessionStorage.welfareObj).boonLogId){
                                shareObj.desc='解锁领福利,就要靠友谊!';
                            }else{
                                shareObj.desc='一大波福利正在向你靠近~';
                            }
                        }
                        
                    }
                    shareObj.title=JSON.parse(window.sessionStorage.welfareObj).title;
                    shareObj.imgUrl=JSON.parse(window.sessionStorage.welfareObj).imgurl ? JSON.parse(window.sessionStorage.welfareObj).imgurl : PUBLIC.defaultImg;
                    if(JSON.parse(window.sessionStorage.welfareObj).boonLogId){
                        shareObj.link='http://'+window.location.host+'/#/friendship?boonLogId='+JSON.parse(window.sessionStorage.welfareObj).boonLogId;
                    }else{
                        shareObj.link=window.location.href;
                    }
                    
            }
            }
            return shareObj;

        },
        isWechat:function(){
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            }else{
                return false;
            }
        }

}

export default PUBLIC
