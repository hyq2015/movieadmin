import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AddmovieActions from '../actions/addMovieActions'
import * as frameActions from '../actions/frameActions'

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import '../src/styles/addmovie.less'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Uploader from '../src/js/uploader'
import XHR from '../src/js/XHR'

import PUBLIC from '../src/js/public'
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
            },
            statistic:{
                name:'',
                phone:'',
                roomNumber:''
            },
            previewImgUrl:'',
            uploadProgress:0,
        }
        
        this.changeVal=this.changeVal.bind(this)
        this.previewImg=this.previewImg.bind(this)
        this.uploadProgress=this.uploadProgress.bind(this)
        this.startUpload=this.startUpload.bind(this)
        this.getJavaData=this.getJavaData.bind(this)
    }
    componentDidMount(){
        // this.props.addmovieActions.getQiniuToken();
        let _this=this;
        XHR('getQiniuToken',{},this.props.history)
        .then(res=>{
            Uploader('pickfiles',this.previewImg,this.uploadProgress,res.data.token)
        })

        // domain为七牛空间对应的域名，选择某个空间后，可通过 空间设置->基本设置->域名设置 查看获取
        // uploader为一个plupload对象，继承了所有plupload的方法
    }
    previewImg(imgurl){
        let oldMovie=this.state.movie;
        oldMovie.imgurl='http://'+imgurl;
        this.setState({
            previewImgUrl:'http://'+imgurl,
            movie:oldMovie
        })
    }
    changeVal(e,val,type){
        let movie=this.state.movie;
        for(let key in movie){
            if(key==type){
                movie[key]=val
            }
        }
        this.setState({
            movie:movie
        })
    }
    uploadProgress(percent){
        this.setState({
            uploadProgress:percent
        })
    }
    startUpload(){
        Uploader.start();
    }
    getJavaData(){
        this.props.addmovieActions.getJavaData()
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
                <div>上传图片</div>
                <div id="pickfiles">
                <FloatingActionButton style={{margin:'20px 20px 20px 0'}}>
                    <ContentAdd />
                </FloatingActionButton>
                </div>
                {this.state.previewImgUrl ?
                    <div style={{position:'relative',marginBottom:20}}>
                        {/* <CircularProgress
                        mode="determinate"
                        value={this.state.uploadProgress}
                        size={80}
                        thickness={5}
                        style={{position:'absolute',top:10,left:10,zIndex:100,display:this.state.uploadProgress>0 ? 'inline-block' : 'none'}}
                    /> */}
                        <img src={this.state.previewImgUrl+PUBLIC.cropImg(100,100)} style={{width:100,height:100,display:this.state.previewImgUrl ? 'inline-block' : 'none'}}/>
                    </div> : null
                }
                <RaisedButton label="提交数据" primary={true} onClick={()=>this.props.addmovieActions.Addmovie(this.state.movie,this.props.history)} style={{width:'100%'}} />
                <RaisedButton label="开始上传" primary={true} onClick={this.startUpload} style={{width:'100%'}} />
                <RaisedButton label="Node调用java接口" primary={true} onClick={this.getJavaData} style={{width:'100%'}} />
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
  export default connect(mapStateToProps, mapDispatchToProps)(AddMovie)