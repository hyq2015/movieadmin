import React ,{Component} from 'react'
import '../src/styles/actiontoast.less'
export default class ActionToast extends Component{
    constructor(props){
        super(props)
        this.state={
            open:false
        }
    }
    componentWillReceiveProps(props){
        this.setState({
            open:props.open
        })
        if(props.open){
            let hideDuration=this.props.hideDuration || 2000;
            setTimeout(()=>{
                this.setState({
                    open:false
                })
                this.props.onRequestClose();
            },hideDuration)
        }
    }
    render(){
        return(
            <div className="action-toast" style={{transform:this.state.open ? 'translate(-50%, 0px)' : 'translate(-50%, -48px)'}}>{this.props.actiontxt}</div>
        )
    }
}