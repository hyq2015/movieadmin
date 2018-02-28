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
import AlbumList from '../containers/Albumlist';
import Autoplan from '../containers/Autoplan';
import BaiYue from '../containers/RightsStatistic';
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
                    {/*<Route path="/portal" exact component={Login}/>*/}
                    {/*<Route path="/" exact component={BaiYue}/>*/}
                    <Route path="/portal/user/auth" exact component={Login}/>
                    <Route path="/portal/movie/list" component={Play}></Route>
                    <Route path="/portal/movie/add" component={AddMovie}></Route>
                    <Route path="/portal/learnrecord" component={LearnRecord}></Route>
                    <Route path="/portal/song/list" component={Addsong}></Route>
                    <Route path="/portal/album/add" component={Addalbum}></Route>
                    <Route path="/portal/album/list" component={AlbumList}></Route>
                    <Route path="/portal/autoplan" component={Autoplan}></Route>
                    <Route path="/portal/baiyue" component={BaiYue}></Route>
                </Switch>
                
            </Frame>
            
        // </Router>
    )
}


export default Routes

    
