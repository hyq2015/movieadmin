import React,{Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as frameActions from '../actions/frameActions'
import { withRouter ,Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/av/movie';
import PlusOne from 'material-ui/svg-icons/av/videocam';
import ContentLink from 'material-ui/svg-icons/content/link';
import FingerPrint from 'material-ui/svg-icons/action/fingerprint';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Pantool from 'material-ui/svg-icons/action/lock';
import Delete from 'material-ui/svg-icons/action/delete';
import Music from 'material-ui/svg-icons/av/library-music';
import Photo from 'material-ui/svg-icons/image/add-a-photo';
import Car from 'material-ui/svg-icons/maps/directions-car';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../components/loader'

import '../src/styles/app.less'
import ActionToast from '../components/actionToast'


const style = {
    paper: {
        display: 'inline-block',
        float:'left',
        margin: '16px 32px 16px 0',
        backgroundColor:'transparent'
    },
    rightIcon: {
        textAlign: 'center',
        lineHeight: '24px',
    },
    toggle:{
        marginBottom: 16
    }
};

class Frame extends Component{
    constructor(props){
        super(props)
        this.clickItem=this.clickItem.bind(this)
        this.toggle=this.toggle.bind(this)
    }
    componentDidMount(){
        console.log('进入app')
        this.props.getCurrentUser(this.props.history)
    }
    clickItem(link){
        // if(link!='/user/auth'){
        //     document.querySelector('canvas').style.display='none'
        // }else{
        //     document.querySelector('canvas').style.display='block'
        // }
        if(this.props.user && this.props.user._id){
            this.props.history.push(link)
        }
        // this.props.history.push(link)
    }
    componentDidUpdate(){
        if(this.props.user.bgmusic){
            if(this.props.musicPlaying){
                this.refs.bgmusic.play()
            }else if(!this.props.musicPlaying){
                this.refs.bgmusic.pause()
            }
        }
        
    }
    toggle(e,checked){
        if(!checked){
            this.refs.bgmusic.pause()
        }else{
            this.refs.bgmusic.play()
        }
        this.props.changePlayStatus(checked,true)
    }
    render(){
        const {activebar,tabshow,noticeTabbar}=this.props;
        const actions = [
            <FlatButton
                label="知道了"
                primary={true}
                onClick={this.props.hideModal}
            />
        ];
        return(
            <div className="app-container" style={{height: 'calc(100vh - 64px)'}}>
                <ActionToast 
                    actiontxt={this.props.remindTxt}
                    open={this.props.successToastOpen}
                    hideDuration={this.props.hideDuration}
                    onRequestClose={this.props.hideSuccessToast}
                />
                
                <Dialog
                    title="出错啦"
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.hideModal}
                >
                    {this.props.errorTxt}
                </Dialog>
                <AppBar
                    title="梦想工作台"
                    style={{position:'fixed',top:0,left:0}}
                    iconStyleRight={{display:'flex',alignItems:'center',marginTop:0}}
                    iconElementRight={<Toggle 
                        label="music" trackSwitchedStyle={{backgroundColor:'#fff'}}
                        thumbSwitchedStyle={{backgroundColor:'#00c8fb'}}
                        labelStyle={{color:'#fff'}}
                        onToggle={this.toggle}
                        toggled={this.props.musicPlaying}
                    />}
                />
                <div>
                    <audio src={this.props.user.bgmusic ? this.props.user.bgmusic : ''} autoPlay ref="bgmusic"></audio>
                </div>
                <Paper style={style.paper}>
                    <Menu
                        selectedMenuItemStyle={{color:'#00c8fb'}}
                    >
                        <MenuItem primaryText="登录登出" onClick={()=>this.clickItem('/user/auth')} leftIcon={<Pantool />} />
                        <MenuItem primaryText="收藏电影" onClick={()=>this.clickItem('/movie/list')} leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="添加电影" onClick={()=>this.clickItem('/movie/add')} leftIcon={<PlusOne />} />
                        <MenuItem primaryText="音乐魔盒" onClick={()=>this.clickItem('/song/list')} leftIcon={<Music />} />
                        <MenuItem primaryText="绚丽影集" onClick={()=>this.clickItem('/album/add')} leftIcon={<Photo />} />
                        <MenuItem primaryText="影集列表" onClick={()=>this.clickItem('/album/list')} leftIcon={<Photo />} />
                        <MenuItem primaryText="代码狂魔" onClick={()=>this.clickItem('/learnrecord')} leftIcon={<FingerPrint />} />
                        <MenuItem primaryText="四轮计划" onClick={()=>this.clickItem('/autoplan')} leftIcon={<Car />} />
                        {/* <Divider /> */}
                    </Menu>
                </Paper>
                <div className="frame">
                        {this.props.pageLoaderShow ? 
                            <div className="loader">
                                <Loader></Loader>
                            </div> : null
                        }
                    <section className="container-right" style={{display:this.props.pageLoaderShow && this.props.location.pathname!='/user/auth' ? 'none' : 'block'}}>
                        {this.props.children}
                    </section>
                    
                </div>
            </div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return state.get('frame')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return bindActionCreators(frameActions, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Frame))