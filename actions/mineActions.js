import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
//请求数据
export function fetchData(activebar,hastabbar){
    return (dispatch, getState) => {
        dispatch({
            type:types.FETCH_MINE_DATA,
            payLoad:{
                dataLoaded:true
            }
        })
    
   }
}
