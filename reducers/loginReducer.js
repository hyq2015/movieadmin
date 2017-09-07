import types from '../src/js/actiontypes'
//reducer其实也是个方法而已,参数是state和action,返回值是新的state
const initialState1={
    dataSaved:false,
    blurbg:true
}
export default function play(state =initialState1, action) {
  switch (action.type) {
    
    case types.USER_LOGIN:
      // newTheme.content=state.theme.content.concat(newTheme.content)
      return {
        ...state,
        user:action.payLoad.user,
        blurbg:false,
        dataSaved:true
      }
    case types.USER_LOGOUT:
      // newTheme.content=state.theme.content.concat(newTheme.content)
      return {
        ...state,
        user:action.payLoad.user,
        blurbg:true,
        dataSaved:true
      }
    case types.USER_SIGNNIN:
      return{
        ...state,
        user:action.payLoad.user,
        blurbg:false,
        dataSaved:true
      }
    default:
      return state
  }
}
