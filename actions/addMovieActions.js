import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import _ from 'lodash'
export function Addmovie(jsondata){
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
        })
      }
}