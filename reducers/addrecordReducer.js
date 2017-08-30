import types from '../src/js/actiontypes'
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
const initialState1={
    dataSaved:false,
    list:[]
}
export default function play(state =initialState1, action) {
  switch (action.type) {
    
    case types.ADD_LEARN_RECORD:
      let addedTemplate=action.payLoad.addedTemplate;
      return {
        ...state,
        data:addedTemplate,
        dataSaved:true
      }
      
    case types.LEARN_RECORD_LIST:
      
      return {
        ...state,
        list:action.payLoad.list.data,
      }
      
    default:
      return state
  }
}
