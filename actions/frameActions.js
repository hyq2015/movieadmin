import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
//请求数据
export function noticeTabbar(activebar,hastabbar){
    return (dispatch, getState) => {
        dispatch({
            type:types.FETCH_FRAME_DATA,
            payLoad:{
                activebar:activebar,
                tabshow:hastabbar
            }
        })
    
   }
}
