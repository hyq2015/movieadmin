import types from '../src/js/actiontypes'
const initialState={
    dataLoaded:false
}
export default function MineReducer(state =initialState, action) {
    switch (action.type) {
        case types.FETCH_MINE_DATA:
        return{
            ...state,
            dataLoaded:action.payLoad.dataLoaded
        }
        default:
            return state
    }
}