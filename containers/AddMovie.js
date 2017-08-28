import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AddmovieActions from '../actions/addMovieActions'
import * as frameActions from '../actions/frameActions'

import { withRouter } from 'react-router-dom'
import '../src/styles/addmovie.less'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class AddMovie extends Component{
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
            }
        }
        
        this.changeVal=this.changeVal.bind(this)
    }
    changeVal(e,val,type){
        let movie=this.state.movie;
        for(let key in movie){
            if(key==type){
                movie[key]=val
            }
        }
        console.log(movie)
        this.setState({
            movie:movie
        })
    }
    componentDidUpdate(){
        if(this.props.erroropen){
            this.props.frameActions.showModal(this.props.erroropen)
        }
    }
    render(){
        return(
            <div id="addmovieContainer">
                <div>
                    <TextField
                        hintText="电影名字"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'name')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="上映时间"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'releaseTime')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="电影封面图"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'imgurl')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="豆瓣评分"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'score')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="影片标签"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'tag')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="下载地址"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'downloadurl')}
                    />
                </div>
                <div>
                    <TextField
                        hintText="影片简介"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'desc')}
                    />
                </div>
                <RaisedButton label="提交" primary={true} onClick={()=>this.props.addmovieActions.Addmovie(this.state.movie)} style={{width:'100%'}} />
            </div>
        )
    }
}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('addmovie')
  }
  //将action的所有方法绑定到props上
  function mapDispatchToProps(dispatch) {
    return {
        addmovieActions:bindActionCreators(AddmovieActions, dispatch),
        frameActions:bindActionCreators(frameActions, dispatch)
    }
  }
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddMovie))