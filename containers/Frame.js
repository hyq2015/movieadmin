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
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';

import '../src/styles/app.less'
import Tabbar from '../components/Tabbar'

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
};

class Frame extends Component{
    constructor(props){
        super(props)
        this.clickItem=this.clickItem.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
    }
    clickItem(link){
        
        this.props.history.push(link)
    }
    render(){
        const {activebar,tabshow,noticeTabbar}=this.props;
        return(
            <div>
                <AppBar
                    title="好电影,看好看的"
                />
                <Paper style={style.paper}>
                    <Menu>
                        <MenuItem primaryText="电影列表" onClick={()=>this.clickItem('/')} leftIcon={<RemoveRedEye />} />
                        <MenuItem primaryText="添加电影" onClick={()=>this.clickItem('/movie/add')} leftIcon={<PersonAdd />} />
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