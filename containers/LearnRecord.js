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
        }
        this.changeVal=this.changeVal.bind(this);
        this.submit=this.submit.bind(this);
        this.changeRadio=this.changeRadio.bind(this);
        this.templateContentChange=this.templateContentChange.bind(this);
        
    }
    componentDidMount(){
        if(this.props.list.length<1){
            this.props.LearnRecordActions.GetRecodList({pageNo:1,pageSize:100})
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
            
            this.props.LearnRecordActions.Addrecord({name:this.state.templateName,template:this.state.templateContent})
        }
    }
    changeRadio(e,value){
        let index=e.target.getAttribute('data-index');
        this.setState({
            currentTemplate:this.props.list[index]
        })
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
                    <div>
                        <TextField
                            hintText="当前模板名称"
                            className="input-filed"
                            style={{width:'100%'}}
                            value={this.state.currentTemplate.name}
                        />
                    </div>
                    
                    <div>
                        <textarea  className="gen_area" placeholder="模板内容" value={this.state.currentTemplate.template}></textarea>
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