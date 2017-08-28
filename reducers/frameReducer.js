import types from '../src/js/actiontypes'
const initialState={
    activebar:1,
    tabshow:true
}
export default function counter(state =initialState, action) {
    switch (action.type) {
        case types.FETCH_FRAME_DATA:
        return{
            ...state,
            activebar:action.payLoad.activebar,
            tabshow:action.payLoad.tabshow
        }
        default:
            return state
    }
}