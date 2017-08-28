import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as mineActions from '../actions/mineActions'
import * as frameActions from '../actions/frameActions'
import { withRouter } from 'react-router-dom'
import SCROLL_POSITION from '../src/js/catcheState'
class Mine extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        // console.log(this.props)
        this.props.frameActions.noticeTabbar(3,true)
    }
    componentWillUnmount(){
        SCROLL_POSITION.addCatche(this.props.location.pathname,document.body.scrollTop)
    }
    render(){
        return(
            <div>我的页面</div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return state.get('mine')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return {
      mineActions:bindActionCreators(mineActions, dispatch),
      frameActions:bindActionCreators(frameActions, dispatch),
      dispatch: dispatch  
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Mine))