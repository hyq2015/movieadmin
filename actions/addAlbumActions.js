import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import _ from 'lodash'
import * as frameActions from '../actions/frameActions'
export function AddAlbum(jsondata,history){
    return(dispatch,getState)=>{
        XHR('addAlbum',jsondata,history)
        .then(res=>{
            dispatch({
                type:types.ADD_ALBUM,
                payLoad:{
                    album:res.data
                }
            })
            dispatch(frameActions.showSuccessToast('操作成功',2000))
        })
        .catch(err=>{
            dispatch(frameActions.showModal(err.message));
        })
    }
}