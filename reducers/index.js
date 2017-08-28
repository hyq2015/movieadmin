import { combineReducers } from 'redux-immutable'
import welfare from './counterRecucer'
import play from './playReducer'
import frame from './frameReducer'
import mine from './MineReducer'
import addmovie from './addmovie'
import {routerReducer } from 'react-router-redux';
//使用redux的combineReducers方法将所有reducer打包起来
const rootReducer = combineReducers({
  welfare,
  play,
  frame,
  mine,
  addmovie,
  router: routerReducer
})
// const rootReducer = combineReducers({counter:counter,play:play,routing:routerReducer})

export default rootReducer
