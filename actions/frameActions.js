import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
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
