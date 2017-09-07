import { combineReducers } from 'redux-immutable'
// import welfare from './counterRecucer'
import play from './playReducer'
import frame from './frameReducer'
// import mine from './MineReducer'
import addmovie from './addmovie'
import addrecord from './addrecordReducer'
import login from './loginReducer'
import addsong from './addsongReducer'
import addalbum from './addalbumReducer'
import albumlist from './albumlistReducer'
import {routerReducer } from 'react-router-redux';
//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  play,
  frame,
  addmovie,
  addrecord,
  login,
  addsong,
  addalbum,
  albumlist,
  router: routerReducer
})
// const rootReducer = combineReducers({counter:counter,play:play,routing:routerReducer})

export default rootReducer
