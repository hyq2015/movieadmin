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
export function AddDog(jsondata,history){
    return(dispatch,getState)=>{
        XHR('addDog',jsondata,history)
            .then(res=>{
                dispatch({
                    type:types.ADD_DOG,
                    payLoad:{
                        dog:res.data
                    }
                })
                dispatch(frameActions.showSuccessToast('操作成功',2000))
            })
            .catch(err=>{
                dispatch(frameActions.showModal(err.message));
            })
    }
}
export function removeDog(jsondata,history){
    return(dispatch,getState)=>{
        XHR('removeDog',jsondata,history)
            .then(res=>{
                dispatch({
                    type:types.REMOVE_DOG,
                    payLoad:{
                        dog:res.data
                    }
                })
                dispatch(frameActions.showSuccessToast('操作成功',2000))
            })
            .catch(err=>{
                dispatch(frameActions.showModal(err.message));
            })
    }
}
export function updateDog(jsondata,history){
    return(dispatch,getState)=>{
        XHR('updateDog',jsondata,history)
            .then(res=>{
                dispatch({
                    type:types.UPDATE_DOG,
                    payLoad:{
                        dog:res.data
                    }
                })
                dispatch(frameActions.showSuccessToast('操作成功',2000))
            })
            .catch(err=>{
                dispatch(frameActions.showModal(err.message));
            })
    }
}

