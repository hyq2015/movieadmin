import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import _ from 'lodash'
import * as frameActions from '../actions/frameActions'

export function Addrecord(jsondata){
    return (dispatch, getState) => {
        XHR('addcodeTemplate',jsondata)
        .then(res=>{
            dispatch({
                type:types.ADD_LEARN_RECORD,
                payLoad:{
                  addedTemplate:res
                }
            })
            dispatch(frameActions.showSuccessToast('操作成功',2000))
          })
        .catch(err=>{
          dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
        })
      }
}

export function GetRecodList(jsondata){
  return (dispatch, getState) => {
    XHR('getcodeTemplateList',jsondata)
    .then(res=>{
        dispatch({
            type:types.LEARN_RECORD_LIST,
            payLoad:{
              list:res
            }
        })
        
      })
    .catch(err=>{
      dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
    })
  }
}