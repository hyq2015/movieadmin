import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AddalbumActions from '../actions/addAlbumActions'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import '../src/styles/addmovie.less'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Uploader from '../src/js/uploader'
import XHR from '../src/js/XHR'
import PUBLIC from '../src/js/public'
class AddAlbum extends Component{
    constructor(props){
        super(props)
        this.state={
            album:{
                intro:'',
                imgurl:''
            },
            previewImgUrl:'',
            uploadProgress:0,
        }
        
        this.changeVal=this.changeVal.bind(this)
        this.previewImg=this.previewImg.bind(this)
        this.uploadProgress=this.uploadProgress.bind(this)
        this.submit=this.submit.bind(this)
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
        let oldAlbum=this.state.album;
        oldAlbum.imgurl='http://'+imgurl;
        this.setState({
            previewImgUrl:'http://'+imgurl,
            album:oldAlbum
        })
    }
    changeVal(e,val,type){
        let album=this.state.album;
        for(let key in album){
            if(key==type){
                album[key]=val
            }
        }
        this.setState({
            album:album
        })
    }
    uploadProgress(percent){
        this.setState({
            uploadProgress:percent
        })
    }
    submit(){
        let album=this.state.album;
        for(let key in album){
            if(album[key]=='' || !album[key]){
                this.props.frameActions.showModal('缺少必填字段');
                return
            }
        }
        
        this.props.addalbumActions.AddAlbum(_.clone(this.state.album),this.props.history)
        album.imgurl='';
        this.setState({
            uploadProgress:0,
            album:album
        })
    }
    render(){
        return(
            <div id="addalbumContainer">
                <div>
                    <TextField
                        hintText="图片简介"
                        className="input-filed"
                        style={{width:'100%'}}
                        onChange={(e,val)=>this.changeVal(e,val,'intro')}
                    />
                </div>
                
                <div>
                    <TextField
                        hintText="图片地址"
                        className="input-filed"
                        style={{width:'100%'}}
                        value={this.state.album.imgurl}
                        onChange={(e,val)=>this.changeVal(e,val,'imgurl')}
                    />
                </div>
                <div>上传图片</div>
                <div id="pickfiles">
                    <FloatingActionButton style={{margin:'20px 20px 20px 0'}}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
                <div style={{position:'relative',marginBottom:20}}>
                    {/* <CircularProgress
                        mode="determinate"
                        value={this.state.uploadProgress}
                        size={80}
                        thickness={5}
                        style={{position:'absolute',top:10,left:10,zIndex:100,display:this.state.uploadProgress>0 ? 'inline-block' : 'none'}}
                    /> */}
                    {this.state.previewImgUrl ?
                        <img src={this.state.previewImgUrl+PUBLIC.cropImg(100,100)} style={{width:100,height:100,display:'inline-block'}}/> : null
                    }
                </div>
                
                <RaisedButton label="提交" primary={true} onClick={this.submit} style={{width:'100%'}} />
                
            </div>
        )
    }
}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('addalbum')
  }
  //将action的所有方法绑定到props上
  function mapDispatchToProps(dispatch) {
    return {
        addalbumActions:bindActionCreators(AddalbumActions, dispatch)
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(AddAlbum)