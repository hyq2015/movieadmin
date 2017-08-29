import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LearnRecordActions from '../actions/LearnRecordActions'
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
            movie:{
                name:'',
                releaseTime:'',
                imgurl:'',
                score:'',
                downloadurl:'',
                desc:'',
                tag:''
            },
            opacity:0,
            color:'#000'
        }
        this.sliderValueChange=this.sliderValueChange.bind(this);
        this.changeColor=this.changeColor.bind(this);
        
    }
    sliderValueChange(e,newValue){
        this.setState({
            opacity:newValue
        })
    }
    changeColor(e,value){
        this.setState({
            color:value
        })
    }
    render(){
        return(
            <div id="learnrecordContainer" style={{margin:'16px 32px 16px 0px',paddingLeft:10}}>
                <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" labelPosition="right">
                    <RadioButton
                        value="shade"
                        label="半透明遮罩层"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="line"
                        label="hoverline"
                        style={styles.radioButton}
                    />
                </RadioButtonGroup>
                <Slider 
                    defaultValue={0} 
                    onChange={this.sliderValueChange}
                    sliderStyle={{marginBottom:0}}
                />
                <TextField
                    hintText="color"
                    type="color"
                    onChange={this.changeColor}
                /><br />
                <div>透明度: {this.state.opacity}  颜色: {this.state.color}</div>
                <RaisedButton label="生成" secondary={true} style={styles.button} />
                <div>
                    <textarea className="gen_area"></textarea>
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
        LearnRecordActions:bindActionCreators(LearnRecordActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LearnRecord)