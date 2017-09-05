import React,{Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as frameActions from '../actions/frameActions'
import { withRouter ,Link} from 'react-router-dom'
import AppBar from 'material-ui/AppBar';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PlusOne from 'material-ui/svg-icons/social/plus-one';
import ContentLink from 'material-ui/svg-icons/content/link';
import FingerPrint from 'material-ui/svg-icons/action/fingerprint';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Pantool from 'material-ui/svg-icons/action/lock';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import '../src/styles/app.less'
import ActionToast from '../components/actionToast'


const style = {
    paper: {
        display: 'inline-block',
        float: 'left',
        margin: '16px 32px 16px 0',
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
        console.log(this.props)
    }
    clickItem(link){
        
        this.props.history.push(link)
    }
    toggle(e,checked){
        if(!checked){
            this.refs.bgmusic.pause()
        }else{
            this.refs.bgmusic.play()
        }
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
                    title="解忧杂货店"
                    style={{position:'fixed',top:0,left:0}}
                    iconStyleRight={{display:'flex',alignItems:'center',marginTop:0}}
                    iconElementRight={<Toggle 
                        label="music" trackSwitchedStyle={{backgroundColor:'#fff'}}
                        thumbSwitchedStyle={{backgroundColor:'#00c8fb'}}
                        labelStyle={{color:'#fff'}}
                        onToggle={this.toggle}
                        defaultToggled={true}
                    />}
                />
                <div>
                    <audio src="http://ovhjj2x39.bkt.clouddn.com/jaychou_srz.mp3" autoPlay ref="bgmusic"></audio>
                </div>
                <Paper style={style.paper}>
                    <Menu
                        selectedMenuItemStyle={{color:'#00c8fb'}}
                    >
                        <MenuItem primaryText="登录登出" onClick={()=>this.clickItem('/user/auth')} leftIcon={<Pantool />} />
                        <MenuItem primaryText="收藏电影" onClick={()=>this.clickItem('/movie/list')} leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="添加电影" onClick={()=>this.clickItem('/movie/add')} leftIcon={<PlusOne />} />
                        <MenuItem primaryText="代码狂魔" onClick={()=>this.clickItem('/learnrecord')} leftIcon={<FingerPrint />} />
                        {/* <Divider /> */}
                    </Menu>
                </Paper>
                <div className="frame">
                    <section className="container-right">
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