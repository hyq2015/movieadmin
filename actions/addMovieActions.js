import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import _ from 'lodash'
import * as frameActions from '../actions/frameActions'

export function Addmovie(jsondata){
  console.log('发起请求')
    return (dispatch, getState) => {
        XHR('addmovie',jsondata)
        .then(res=>{
            dispatch({
                type:types.ADD_MOVIE,
                payLoad:{
                  addedMovie:res
                }
            })
            dispatch(frameActions.showSuccessToast('操作成功',2000))
          })
        .catch(err=>{
          dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
        })
      }
}

export function getQiniuToken(){
  return (dispatch, getState) => {
    XHR('getQiniuToken',{})
    .then(res=>{
        dispatch({
            type:types.GET_QINIU_TOKEN,
            payLoad:{
              token:res.data.token
            }
        })
      })
    .catch(err=>{
      dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
    })
  }
}