import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AddstatisticActions from '../actions/addStatisticActions'
import * as frameActions from '../actions/frameActions'

import '../src/styles/addmovie.less'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
class AddStatistic extends Component{
    constructor(props){
        super(props)
        this.state={
            statistic:{
                name:'',
                phone:'',
                roomNumber:''
            }
        }
        this.changeStatistic=this.changeStatistic.bind(this)
        this.submitData=this.submitData.bind(this)
    }
    componentDidMount(){
        this.props.frameActions.changeMenuStatus(false)
    }
    changeStatistic(e,val,type){
        let statistic=this.state.statistic;
        for(let key in statistic){
            if(key==type){
                statistic[key]=val
            }
        }
        this.setState({
            statistic:statistic
        })
    }
    submitData(){
        console.log(this.state.statistic)
        let data=this.state.statistic;
        if(!data.name || !data.phone || !data.roomNumber){
            this.props.frameActions.showSuccessToast('请完善信息', 2000);
        }else{
            this.props.addStatisticActions.AddStatistic(this.state.statistic,this.props.history)
        }
    }
    render(){
        return(
            <div style={{padding:'0 10px'}}>
                <div>
                    <TextField
                        hintText="姓名"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeStatistic(e,val,'name')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="手机号"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeStatistic(e,val,'phone')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="房号"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeStatistic(e,val,'roomNumber')}
                    />
                </div>
                <RaisedButton label="提交" primary={true} onClick={this.submitData} style={{width:'100%'}} />
            </div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('statistic')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return {
        addStatisticActions:bindActionCreators(AddstatisticActions, dispatch),
        frameActions:bindActionCreators(frameActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddStatistic)