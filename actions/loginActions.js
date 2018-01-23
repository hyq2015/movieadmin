import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import _ from 'lodash'
import * as frameActions from '../actions/frameActions'

export function UserLogin(jsondata,history){
    return (dispatch, getState) => {
        XHR('userLogin',jsondata)
            .then(res=>{
                dispatch({
                    type:types.USER_LOGIN,
                    payLoad:{
                        user:res.data
                    }
                })
                dispatch(frameActions.showSuccessToast('登录成功',2000))
                dispatch(frameActions.userStatusUpdate(res.data))
                history.push({
                    pathname:'/movie/list'
                })
                })
            .catch(err=>{
                dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
            })
        }
}

export function UserLogout(){
    return(dispatch, getState)=>{
        XHR('userLogout',{})
            .then(res=>{
                dispatch({
                    type:types.USER_LOGOUT,
                    payLoad:{
                        user:res.data
                    }
                })
                dispatch(frameActions.showSuccessToast('退出成功',2000))
                dispatch(frameActions.userStatusUpdate(res.data))
            })
            .catch(err=>{
                dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
            })
        
    }
    
}
export function UserSignin(jsondata){
    return (dispatch, getState) => {
        XHR('userSignin',jsondata)
            .then(res=>{
                dispatch({
                    type:types.USER_SIGNNIN,
                    payLoad:{
                        user:res.data
                    }
                })
                dispatch(frameActions.showSuccessToast('注册成功',2000))
                dispatch(frameActions.userStatusUpdate(res.data))
                })
            .catch(err=>{
                dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
            })
        }
}
