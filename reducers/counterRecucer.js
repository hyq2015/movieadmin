import types from '../src/js/actiontypes'
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
const initialState={
  name:'huangyunqi',
  counter:10,
  imgarr:[],
  dataLoaded:false
}
export default function counter(state =initialState, action) {
  switch (action.type) {
    case types.INCREMENT_COUNTER:
      return {
        ...state,
        counter:action.payLoad.counter
      }
    case types.DECREMENT_COUNTER:
      return {
        ...state,
        counter:action.payLoad.counter
      }
    case types.FETCH_DATA_COUNTER:
      return {
        ...state,
        counter:action.payLoad.counter,
        imgarr:action.payLoad.imgarr,
        dataLoaded:true
      }
    default:
      return state
  }
}
