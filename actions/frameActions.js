import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import * as addSongActions from '../actions/addSongActions'

//请求数据
export function noticeTabbar(activebar,hastabbar){
    return (dispatch, getState) => {
        dispatch({
            type:types.FETCH_FRAME_DATA,
            payLoad:{
                activebar:activebar,
                tabshow:hastabbar
            }
        })
    
   }
}

export function userStatusUpdate(user){
    return (dispatch, getState) => {
        dispatch({
            type:types.USER_UPDATE_STATUS,
            payLoad:{
                user:user
            }
        })
    
   }
}

export function changePlayStatus(checked,ifchangesingle){
    return (dispatch, getState) => {
        dispatch({
            type:types.CHANGE_PLAY_STATUS,
            payLoad:{
                status:checked
            }
        })
        if(ifchangesingle){
            dispatch(addSongActions.pausePlaySingle())
        }
        
    
   }
}

export function showModal(txt){
    console.log(txt)
    return (dispatch, getState) => {
        dispatch({
            type:types.SHOW_ERROR_MODAL,
            payLoad:{
                txt:txt
            }
        })
    
   }
}

export function hideModal(){
    return (dispatch, getState) => {
        dispatch({
            type:types.CLOSE_ERROR_MODAL
            
        })
    
   }
}

export function showSuccessToast(txt,duration){
    return (dispatch, getState) => {
        dispatch({
            type:types.SHOW_SUCCESS_TOAST,
            payLoad:{
                txt:txt,
                duration:duration
            }
            
        })
    
   }
}

export function hideSuccessToast(){
    return (dispatch, getState) => {
        dispatch({
            type:types.HIDE_SUCCESS_TOAST
        })
    
   }
}

export function changeMusicUrl(url,singlePlaystatus){
    return (dispatch,getState)=>{
        XHR('userUpdate',{bgmusic:url})
        .then(res=>{
            dispatch({
                type:types.CHANGE_BG_MUSIC,
                payLoad:{
                    url:url,
                    singleplay:singlePlaystatus
                }
            })
            dispatch(showSuccessToast('操作成功',2000))
        })
        .catch(err=>{
            dispatch(showModal(err.message));
        })
    }
}

export function changeMusicUrlWeb(url){
    return (dispatch,getState)=>{
        dispatch({
            type:types.CHANGE_BG_MUSIC,
            payLoad:{
                url:url
            }
        })
    }
}

export function getCurrentUser(history){
    return (dispatch,getState)=>{
        XHR('getUser',{},history)
        .then(res=>{
            dispatch({
                type:types.GET_USER_SUCCESS,
                payLoad:{
                    user:res.data
                }
            })
        })
        .catch(err=>{
            dispatch(showModal(err.message));
        })
    }
}
