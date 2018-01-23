import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AutoplanActions from '../actions/AutoplanActions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import '../src/styles/addcar.less'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Uploader from '../src/js/uploader'
import XHR from '../src/js/XHR'

import PUBLIC from '../src/js/public'
class Autoplan extends Component{
    constructor(props){
        super(props)
        this.state={
            links:['']
        }
        this.changeVal=this.changeVal.bind(this)
        this.handleLine=this.handleLine.bind(this)
        
    }
    changeVal(e,val,type,index){
        if(type=='links'){
            let oldLinks=this.state.links;
            oldLinks[index]=val;
            this.setState({
                links:oldLinks
            })
        }
    }
    handleLine(index,type){
        let oldLinks=this.state.links;
        if(type=='add'){
            oldLinks.push('')
            this.setState({
                links:oldLinks
            })
        }else if(type=='delete' && oldLinks.length>1){
            oldLinks.splice(index,1)
            this.setState({
                links:oldLinks
            })
        }
    }
    render(){
        return(
            <div id="addcarContainer">
                <div>
                    <TextField
                        hintText="型号"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'model')}
                    />
                </div>
                {this.state.links.map((item,index)=>
                    <div className="link-line" key={index}>
                        <TextField
                            hintText="图片链接"
                            className="input-filed"
                            style={{width:'100%'}}
                            onChange={(e,val)=>this.changeVal(e,val,'links',index)}
                            value={item}
                        />
                        <FloatingActionButton mini={true} title="增加" style={{margin:'20px 20px 20px 0'}} onClick={()=>this.handleLine(index,'add')}>
                            <ContentAdd/>
                        </FloatingActionButton>
                        <FloatingActionButton mini={true} title="删除" style={{margin:'20px 0 20px 0'}} onClick={()=>this.handleLine(index,'delete')}>
                            <ContentRemove/>
                        </FloatingActionButton>
                        
                    </div>
                )}
                
                <div>
                    <TextField
                        hintText="vr链接"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'vrlink')}
                    />
                </div>
                <RaisedButton label="提交" primary={true} onClick={()=>this.props.autoplanActions.Addmovie(this.state.movie,this.props.history)} style={{width:'100%'}} />
            </div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('autoplan')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
return {
    autoplanActions:bindActionCreators(AutoplanActions, dispatch)
}
}
export default connect(mapStateToProps, mapDispatchToProps)(Autoplan)