import types from '../src/js/actiontypes'
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
const initialState1={
    dataSaved:false
}
export default function play(state =initialState1, action) {
    switch (action.type) {
        default:
            return state
    }
}
