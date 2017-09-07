import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import * as frameActions from '../actions/frameActions'

import _ from 'lodash'
export function getAlbumList(jsondata,history){
    return(dispatch,getState)=>{
        XHR('getAlbumList',jsondata,history)
        .then(res=>{
            dispatch({
                type:types.GET_ALBUM_LIST,
                payLoad:{
                    list:res.data
                }
            })
            dispatch(frameActions.changeLoaderStatus(false))
        })
        .catch(err=>{
            dispatch(frameActions.showModal(err.message));
        })
    }
}