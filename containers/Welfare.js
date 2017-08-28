import React, { Component} from 'react'
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WelfareActions from '../actions/welfareActions'
import * as frameActions from '../actions/frameActions'
import { withRouter } from 'react-router-dom'
import SCROLL_POSITION from '../src/js/catcheState'
// import PropTypes from 'prop-types';
class Welfare extends Component {
  constructor(props){
    super(props)
    this.goPlay=this.goPlay.bind(this);
  }
  componentWillMount(){
      document.title='福利'
  }
  componentDidMount(){
    if(this.props.imgarr.length<1){
      this.props.welfare.fetchData()
    }
    if(this.props.dataLoaded){
      console.log(this.props.location.pathname)
      let scrollBarPosition=SCROLL_POSITION.getCache(this.props.location.pathname);
      console.log(scrollBarPosition)
      if(scrollBarPosition){
          window.scrollTo(0,scrollBarPosition)
      }else{
        window.scrollTo(0,0)
      }
    }
    this.props.frame.noticeTabbar(2,true)
  }
  componentWillUnmount(){
    console.log(document.body.scrollTop)
    SCROLL_POSITION.addCatche(this.props.location.pathname,document.body.scrollTop)
  }
  goPlay(){
    this.props.history.push('/play')
  }
  render() {
    // console.log(this.props)
    //从组件的props属性中导入四个方法和一个变量
    const { 
      imgarr,history
    } = this.props;
   
    //渲染组件，包括一个数字，四个按钮
    return (
      <div>
        <div style={{backgroundColor:'#fff',width:'100%'}}>
          {imgarr ? imgarr.map((item,index)=>
            <img key={index} src={item.imgurl} style={{width:'100%',height:200}} alt=""/>
          ) : null}
        </div>
      </div>
    )
  }
}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return state.get('welfare')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return{
       welfare:bindActionCreators(WelfareActions, dispatch),
       frame:bindActionCreators(frameActions, dispatch)
  }
}

//通过react-redux提供的connect方法将我们需要的state中的数据和actions中的方法绑定到props上
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welfare))