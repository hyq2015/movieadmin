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
          })
        .catch(err=>{
          console.log(err)
          dispatch({
              type:types.ADD_MOVIE_ERROR,
              payLoad:{
                erroropen:err.message
              }
          })
        })
      }
}