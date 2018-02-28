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
                    <Route path="/dev/portal" exact component={Play}/>
                    {/*<Route path="/" exact component={BaiYue}/>*/}
                    <Route path="/portal/admin/user/auth" exact component={Login}/>
                    <Route path="/portal/admin/movie/list" component={Play}></Route>
                    <Route path="/portal/admin/movie/add" component={AddMovie}></Route>
                    <Route path="/portal/admin/learnrecord" component={LearnRecord}></Route>
                    <Route path="/portal/admin/song/list" component={Addsong}></Route>
                    <Route path="/portal/admin/album/add" component={Addalbum}></Route>
                    <Route path="/portal/admin/album/list" component={AlbumList}></Route>
                    <Route path="/portal/admin/autoplan" component={Autoplan}></Route>
                    <Route path="/portal/admin/baiyue" component={BaiYue}></Route>
                </Switch>
                
            </Frame>
            
        // </Router>
    )
}


export default Routes

    
