/**
 * Created by Administrator on 2017/3/27.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router-dom'
import '../src/styles/iconfont.css';
import '../src/styles/Tabbar.less';
export default class Tabbar extends Component{
  constructor(props){
    super(props);
    this.state={
      currentPlayColor:this.props.activetab==1 ? '#00c8f8' : '#a9a9a9',
      currentMallColor:this.props.activetab==2 ? '#00c8f8' : '#a9a9a9',
      currentMineColor:this.props.activetab==3 ? '#00c8f8' : '#a9a9a9',
    }
  }
  componentWillMount(){
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      currentPlayColor:nextProps.activetab==1 ? '#00c8f8' : '#a9a9a9',
      currentMallColor:nextProps.activetab==2 ? '#00c8f8' : '#a9a9a9',
      currentMineColor:nextProps.activetab==3 ? '#00c8f8' : '#a9a9a9',
    });
    return true
  }

  render(){
    return(
      <div className="tabBar-container">
          <Link to='play' className="tab-item">
            <span className="single-atag" onClick={()=>{this.props.changeTab(1)}}>
             <span className="tab-img iconfont icon-yw_tabicon-yw_activity" style={{color:this.state.currentPlayColor}}></span>
            <span className="tab-name">游玩</span>
            </span>
          </Link>
           <Link to='welfare' className="tab-item">
            <span onClick={()=>{this.props.changeTab(2)}}>
             <span className="tab-img iconfont icon-fl_icon_fuli" style={{color:this.state.currentMallColor}}></span>
            <span className="tab-name">福利</span>
            </span>
          </Link>
           <Link to='mine' className="tab-item">
            <span onClick={()=>{this.props.changeTab(3)}}>
             <span className="tab-img iconfont icon-yw_tabicon_mine" style={{color:this.state.currentMineColor}}></span>
            <span className="tab-name">我的</span>
            </span>
          </Link>
      </div>
    )
  }
}
