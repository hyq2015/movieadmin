import types from '../src/js/actiontypes'
const initialState1={
    dataLoaded:false,
    albumlist:[],
    
}
export default function getalbum(state=initialState1,action){
    switch (action.type){
        case types.GET_ALBUM_LIST:
            return{
                ...state,
                albumlist:action.payLoad.list,
                dataLoaded:true
            }
        case types.SWITCH_USER:
            return initialState1
        default:
            return state
    }
}