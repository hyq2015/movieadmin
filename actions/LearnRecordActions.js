import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import _ from 'lodash'
import * as frameActions from '../actions/frameActions'

export function Addrecord(jsondata){
    return (dispatch, getState) => {
        XHR('addmovie',jsondata)
        .then(res=>{
            dispatch({
                type:types.ADD_LEARN_RECORD,
                payLoad:{
                  addedMovie:res
                }
            })
          })
        .catch(err=>{
          dispatch(frameActions.showModal(err.message));//在一个action中触发另一个action,可用于组件之间通信!
        })
      }
}