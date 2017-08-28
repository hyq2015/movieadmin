import types from '../src/js/actiontypes'
const initialState={
    activebar:1,
    tabshow:true,
    open:false,
    errorTxt:''
}
export default function counter(state =initialState, action) {
    switch (action.type) {
        case types.FETCH_FRAME_DATA:
        return{
            ...state,
            activebar:action.payLoad.activebar,
            tabshow:action.payLoad.tabshow
        }
        case types.CLOSE_ERROR_MODAL:
            return{
                ...state,
                open:false
            }
        case types.SHOW_ERROR_MODAL:
        console.log('show modal')
            return{
                ...state,
                open:true,
                errorTxt:action.payLoad.txt
            }
        default:
            return state
    }
}