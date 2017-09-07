// import {Router ,Route,IndexRoute,hashHistory} from 'react-router';
import React ,{Component} from 'react'
import Frame from '../containers/Frame';
// import Welfare from '../containers/Welfare';
import Play from '../containers/Play';
import AddMovie from '../containers/AddMovie';
import LearnRecord from '../containers/LearnRecord';
import Login from '../containers/Login';
import Addsong from '../containers/AddSong';
import Addalbum from '../containers/Addalbum';
// import Mine from '../containers/Mine';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  IndexRoute,
  hashHistory,
  browserHistory,
  Redirect,
  Switch
} from 'react-router-dom'
const Routes=()=>{
    return(
        // <Router history={browserHistory}>
            <Frame>
                <Switch>
                    <Route path="/" exact component={Play}/>
                    <Route path="/user/auth" exact component={Login}/>
                    <Route path="/movie/list" component={Play}></Route>
                    <Route path="/movie/add" component={AddMovie}></Route>
                    <Route path="/learnrecord" component={LearnRecord}></Route>
                    <Route path="/song/list" component={Addsong}></Route>
                    <Route path="/album/add" component={Addalbum}></Route>
                </Switch>
                
            </Frame>
            
        // </Router>
    )
}


export default Routes

    
