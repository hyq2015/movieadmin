import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import * as frameActions from '../actions/frameActions'

import _ from 'lodash'
//请求数据
export function fetchData(jsondata,history){
  return (dispatch, getState) => {
    XHR('getMovieList',jsondata,history)
    .then(res=>{
        dispatch({
            type:types.FETCH_DATA_PLAY,
            payLoad:{
              lists:res
            }
        })
        dispatch(frameActions.changeLoaderStatus(false))
      })
    .catch(err=>{
      console.log(err)
    })
  }
}
export function noticeLoading(loadingStatus){
  return (dispatch, getState)=>{
    dispatch({
        type:types.PLAY_LOADING_STATUS,
        payLoad:{
          loading:loadingStatus
        }
    })
  }
}
export function fetchBanner(jsondata){
  return (dispatch, getState) => {
    XHR('getBannerIndexItem',jsondata)
    .then(res=>{
      let finalRes={};
      if(!res.content){
        finalRes.content=res;
      }else{
        finalRes=res;
      }
        dispatch({
            type:types.FETCH_BANNER_PLAY,
            payLoad:{
              banner:finalRes
            }
        })
        dispatch(handleBannerImgs(finalRes.content))
      })
    .catch(err=>{
      console.log(err)
    })
  }
}
export function handleBannerImgs(bannerarr){
  return(dispatch,getState)=>{
    let bannerlist=_.shuffle(bannerarr);
    let realBannerImgs=[],realReverseBannerImgs=[];
    for(let i=0;i<bannerlist.length;i++){
      let normalObj={};
      normalObj.img=bannerlist[i].imgurl;
      normalObj.linktype=bannerlist[i].type;
      normalObj.title=bannerlist[i].title ? bannerlist[i].title.substr(0,8) : '';
      normalObj.desc=bannerlist[i].simpleDesc ? bannerlist[i].simpleDesc.substr(0,12) : '这里很好玩';
      normalObj.bgcolor=bannerlist[i].bgcolor ? bannerlist[i].bgcolor : '#00c8fb';
      if(bannerlist[i].type.toUpperCase()=='PRODUCT' && bannerlist[i].product && bannerlist[i].product.id){
        normalObj.link='#prodetail?id='+bannerlist[i].product.id
      }else if(bannerlist[i].type.toUpperCase()=='THEME' && bannerlist[i].theme && bannerlist[i].theme.id){
        normalObj.link='#theme?id='+bannerlist[i].theme.id+'&name='+bannerlist[i].theme.name;
      }else if(bannerlist[i].type.toUpperCase()=='SHOP' && bannerlist[i].shop && bannerlist[i].shop.id){
        normalObj.link='#shop?id='+bannerlist[i].shop.id
      }else if(bannerlist[i].type.toUpperCase()=='ARTICLE' && bannerlist[i].article.origin){
        normalObj.link=bannerlist[i].article.origin;
      }else if(bannerlist[i].type.toUpperCase()=='LINK' && bannerlist[i].linkurl){
        normalObj.link=bannerlist[i].linkurl;
      }
      if(i===0){
        normalObj.trans='translateX(0) translateZ(0) translate3d(0px, 0px, 0px)';
        normalObj.zIndex=300;
        normalObj.opacity=1;
      }else if(i==1){
        normalObj.trans='translateX(100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
        normalObj.zIndex=200;
        normalObj.opacity=.6;
      }else if(i>1 && i<bannerlist.length-1){
        normalObj.trans='';
        normalObj.zIndex=200;
        normalObj.opacity=0;
      }else if(i==bannerlist.length-1){
        normalObj.trans='translateX(-100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
        normalObj.zIndex=200;
        normalObj.opacity=.6;
      }
      realBannerImgs.push(normalObj);
      realReverseBannerImgs.push(normalObj);
    }
    dispatch({
      type:types.BANNER_HANDLED,
      payLoad:{
        bannerImgs:realBannerImgs,
        reverseBannerImgs:realReverseBannerImgs
      }
    })

  }
}
let obj={arr:[{name:1},{name:2}]}
export function saveBannerSetting(setting){
  return(dispatch,getState)=>{
    // console.log(getState().get('play'))
    console.log({todos:[{name:'ricky'},...obj.arr]})
    dispatch({
      type:types.SAVE_BANNER,
      payLoad:{
        setting:setting
      }
    })
  }
}
