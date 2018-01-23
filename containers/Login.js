import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LoginActions from '../actions/loginActions'
import * as frameActions from '../actions/frameActions'
import '../src/styles/login.less'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Uploader from '../src/js/uploader'
import  Man from '../components/man'
// import  Robot from '../components/robot'
import PUBLIC from '../src/js/public'
class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            user:{},
            loginTxt:'register',
            btnTxt:'login'
        }
        this.changeVal=this.changeVal.bind(this)
        this.login=this.login.bind(this)
        this.register=this.register.bind(this)
        this.logOut=this.logOut.bind(this)
    }
    
    changeVal(e,type){
        let user=this.state.user;
        if(type=='name'){
            user.nickname=e.target.value;
        }else if(type=='mobile'){
            user.mobile=e.target.value;
        }else if(type=='pwd'){
            user.password=e.target.value;
        }
        this.setState({
            user:user
        })
    }
    login(){
        if(!this.state.user.nickname || !this.state.user.mobile || !this.state.user.password){
            this.props.FrameActions.showModal('请完善信息')
        }else{
            if(this.state.btnTxt=='login'){
                this.props.LoginActions.UserLogin(this.state.user,this.props.history)
            }else{
                this.props.LoginActions.UserSignin(this.state.user,this.props.history)
            }
            
        }
    }
    logOut(){
        this.props.LoginActions.UserLogout()
    }
    register(){
        if(this.state.loginTxt=='login'){
            this.setState({
                loginTxt:'register',
                btnTxt:'login',
            })
        }else{
            this.setState({
                loginTxt:'login',
                btnTxt:'register'
            })
        }
    }
    render(){
        return(
            <div className= "login-page" style={{height:'calc(100vh - 64px)'}}>
                
                {new Man('ricky').sayName()}
                <div className={this.props.blurbg ? "login-bg blur-login" : "login-bg"}></div>
                <div className="loginform">
                    <div className="input-outer">
                        <input type="text" className="inputarea" onChange={(e)=>{this.changeVal(e,'name')}} placeholder="username"/>
                    </div>
                    <div className="input-outer">
                        <input type="text" className="inputarea" placeholder="mobile" onChange={(e)=>{this.changeVal(e,'mobile')}}/>
                    </div>
                    <div className="input-outer">
                        <input type="text" className="inputarea" placeholder="password" onChange={(e)=>{this.changeVal(e,'pwd')}}/>
                    </div>
                    <RaisedButton label={this.state.btnTxt} primary={true} style={{width:'100%',marginTop:50}} onClick={this.login} />
                    <div className="logout" onClick={this.logOut}>logout</div>
                    <div className="register" onClick={this.register}>{this.state.loginTxt}</div>
                </div>
            </div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('login')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return {
        LoginActions:bindActionCreators(LoginActions, dispatch),
        FrameActions:bindActionCreators(frameActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)