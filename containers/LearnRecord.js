import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LearnRecordActions from '../actions/LearnRecordActions'
import * as frameActions from '../actions/frameActions'

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import '../src/styles/learnrecord.less'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    button: {
        margin: '12px 12px 12px 0',
    },
};
class LearnRecord extends Component{
    constructor(props){
        super(props)
        this.state={
            
            templateName:'',
            templateContent:'',
            currentTemplate:'',
            currentUpdateTem:''
        }
        this.changeVal=this.changeVal.bind(this);
        this.submit=this.submit.bind(this);
        this.changeRadio=this.changeRadio.bind(this);
        this.update=this.update.bind(this);
        this.updateVal=this.updateVal.bind(this);
        this.templateContentChange=this.templateContentChange.bind(this);
        this.templateContentUpdate=this.templateContentUpdate.bind(this);
        this.changeSearchVal=this.changeSearchVal.bind(this);
        this.search=this.search.bind(this);
        
    }
    componentDidMount(){
        if(this.props.list.length<1){
            this.props.FrameActions.changeLoaderStatus(true)
            this.props.LearnRecordActions.GetRecodList({pageNo:1,pageSize:100},this.props.history)
        }
        
    }
    changeVal(e,value){
        this.setState({
            templateName:value
        })
    }
    templateContentChange(e){
        this.setState({
            templateContent:e.target.value
        })
    }
    submit(){
        if(!this.state.templateName || !this.state.templateContent){
            this.props.FrameActions.showModal('请完善信息之后再提交')
        }else{
            
            this.props.LearnRecordActions.Addrecord({name:this.state.templateName,template:this.state.templateContent},this.props.history)
        }
    }
    update(){
        console.log(this.state.currentTemplate)
        if(!this.state.currentTemplate){
            this.props.FrameActions.showModal('当前没有选择模板')
        }else{
            this.props.LearnRecordActions.Updaterecord({id:this.state.currentUpdateTem._id,name:this.state.currentUpdateTem.name,template:this.state.currentUpdateTem.template},this.props.history)
        }
    }
    updateVal(e,val){
        this.setState({
            currentUpdateTem:{
                ...this.state.currentUpdateTem,
                name:val
            }
        })
    }
    templateContentUpdate(e){
        this.setState({
            currentUpdateTem:{
                ...this.state.currentUpdateTem,
                template:e.target.value
            }
        })
    }
    changeRadio(e,value){
        let index=e.target.getAttribute('data-index');
        this.setState({
            currentTemplate:this.props.list[index],
            currentUpdateTem:this.props.list[index]
        })
    }
    changeSearchVal(e,val){
        this.setState({
            searchTxt:val
        })
    }
    search(){
        if(!this.state.searchTxt){
            this.props.LearnRecordActions.GetRecodList({pageNo:1,pageSize:100})
        }else{
            this.props.LearnRecordActions.GetRecodList({pageNo:1,pageSize:100,key:this.state.searchTxt})
        }
        
    }
    render(){
        return(
            <div id="learnrecordContainer" style={{margin:'16px 32px 16px 0px',paddingLeft:10}}>
                <div className="addpart">
                    <div>
                        <TextField
                            hintText="模板名称"
                            className="input-filed"
                            style={{width:'100%'}}
                            onChange={(e,val)=>this.changeVal(e,val,'name')}
                            ref="temname"
                        />
                    </div>
                    
                    <div>
                        <textarea onChange={this.templateContentChange} className="gen_area" placeholder="模板内容"></textarea>
                    </div>
                    <RaisedButton label="提交" onClick={this.submit} secondary={true} style={styles.button} />
                </div>
                <div className="updatePart">
                    <div
                        style={{display:'flex',justifyContent:'space-between',width:'100%'}}
                    >
                        <TextField
                            hintText="输入名称进行搜索"
                            className="input-filed"
                            style={{width:'100%'}}
                            onChange={(e,val)=>this.changeSearchVal(e,val)}
                        />
                        <RaisedButton onClick={this.search} label="搜索" secondary={true} style={{...styles.button,marginRight:0,marginLeft:10}} />
                    </div>
                    
                    <div>
                        <TextField
                            hintText="当前模板名称"
                            className="input-filed"
                            style={{width:'100%'}}
                            onChange={(e,val)=>this.updateVal(e,val)}
                            value={this.state.currentUpdateTem.name}
                        />

                    </div>
                    
                    <div>
                        <textarea onChange={this.templateContentUpdate}  className="gen_area" placeholder="模板内容" value={this.state.currentUpdateTem.template}></textarea>
                    </div>
                    {this.props.list.length>0 ? 
                        <RadioButtonGroup
                            onChange={this.changeRadio}
                            name="recordradio"
                        >
                            {this.props.list.map((item,index)=>
                                <RadioButton
                                    key={index}
                                    value={item._id}
                                    label={item.name}
                                    style={styles.radioButton}
                                    data-index={index}
                                />
                            )}
                        
                        </RadioButtonGroup> : null
                    }
                    <RaisedButton label="提交修改" onClick={this.update} secondary={true} style={styles.button} />
                </div>
            </div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('addrecord')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return {
        LearnRecordActions:bindActionCreators(LearnRecordActions, dispatch),
        FrameActions:bindActionCreators(frameActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LearnRecord)