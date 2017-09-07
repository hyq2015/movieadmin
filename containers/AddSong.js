import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AddsongActions from '../actions/addSongActions'
import * as frameActions from '../actions/frameActions'
import _ from 'lodash'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PlayBtn from 'material-ui/svg-icons/av/play-arrow';
import SetBtn from 'material-ui/svg-icons/hardware/headset';
import PauseBtn from 'material-ui/svg-icons/av/pause';
import '../src/styles/addsong.less'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Uploader from '../src/js/uploader'
import XHR from '../src/js/XHR'

import PUBLIC from '../src/js/public'
class AddSong extends Component{
    constructor(props){
        super(props)
        this.state={
            song:{
                name:'',
                url:'',
                singer:''
            },
            uploadProgress:0,
        }
        
        this.changeVal=this.changeVal.bind(this)
        this.uploadProgress=this.uploadProgress.bind(this)
        this.addSong=this.addSong.bind(this)
        this.previewUrl=this.previewUrl.bind(this)
        this.changePlayStatus=this.changePlayStatus.bind(this)
        this.playEnd=this.playEnd.bind(this)
    }
    componentDidMount(){
        // this.props.addmovieActions.getQiniuToken();
        let _this=this;
        XHR('getQiniuToken',{},this.props.history)
        .then(res=>{
            Uploader('pickfiles',this.previewUrl,this.uploadProgress,res.data.token)
        })
       
        this.props.addsongActions.getSongList({pageSize:1000,pageNo:1},this.props.history)
    }
    componentDidUpdate(){
        if(this.props.currentMusicPlaying){
            this.refs.currentmusic.play()
        }else{
            this.refs.currentmusic.pause()
        }
    }
    previewUrl(url){
        let oldSong=this.state.song;
        oldSong.url='http://'+url;
        this.setState({
            song:oldSong
        })
    }
    changeVal(e,val,type){
        let song=this.state.song;
        for(let key in song){
            if(key==type){
                song[key]=val
            }
        }
        this.setState({
            song:song
        })
    }
    uploadProgress(percent){
        this.setState({
            uploadProgress:percent
        })
    }
    addSong(){
        let song=this.state.song;
        for(let key in song){
            if(song[key]=='' || !song[key]){
                this.props.frameActions.showModal('缺少必填字段');
                return
            }
        }
        
        this.props.addsongActions.Addsong(_.clone(this.state.song),this.props.history)
        song.url='';
        this.setState({
            uploadProgress:0,
            song:song
        })
    }
    changePlayStatus(item,index){
        this.props.frameActions.changePlayStatus(false,false)
        this.props.addsongActions.changePlayStatus(item.url,index)
    }
    playEnd(){
        this.props.addsongActions.pausePlaySingle()
    }
    render(){
        return(
            <div id="addsongContainer">
                <div className="add-area">
                    <div>
                        <TextField
                            hintText="歌曲"
                            className="input-filed"
                            style={{width:'100%'}}
                            onChange={(e,val)=>this.changeVal(e,val,'name')}
                        />
                    </div>
                    
                    <div>
                        <TextField
                            hintText="歌手"
                            className="input-filed"
                            style={{width:'100%'}}
                            onChange={(e,val)=>this.changeVal(e,val,'singer')}
                        />
                    </div>
                    <div>
                        <TextField
                            hintText="歌曲链接地址"
                            className="input-filed"
                            style={{width:'100%'}}
                            onChange={(e,val)=>this.changeVal(e,val,'url')}
                            value={this.state.song.url}
                        />
                    </div>
                    <div>上传歌曲</div>
                    <div id="pickfiles">
                        <FloatingActionButton style={{margin:'20px 20px 20px 0'}}>
                            <ContentAdd />
                        </FloatingActionButton>
                        <div className="progress-circle" style={{position:'relative',marginBottom:20}}>
                            <CircularProgress
                                mode="determinate"
                                value={this.state.uploadProgress}
                                size={60}
                                thickness={5}
                                style={{display:this.state.uploadProgress>0 ? 'inline-block' : 'none',width:'100%',height:'100%',position:'absolute',left:0,top:0}}
                            />
                            {this.state.uploadProgress>0 ? 
                                <div className="progress-txt">{this.state.uploadProgress}%</div> : null
                            }
                        </div>
                    </div>
                    
                    
                    <RaisedButton label="提交" primary={true} onClick={this.addSong} style={{width:'100%'}} />
                </div>
                <div className="list-area">
                    <audio onEnded={this.playEnd} src={this.props.currentPlayMusicUrl} ref="currentmusic"></audio>
                    {this.props.songList && this.props.songList.length>0 ? 
                        <table className="list-table" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>歌曲</th>
                                    <th>歌手</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.songList.map((item,index)=>
                                    <tr className="bodytr" key={index}>
                                        <td className="song-name">{item.name}</td>
                                        <td className="singer">{item.singer}</td>
                                        <td style={{cursor:'pointer'}}>
                                            <span title="播放" onClick={()=>{this.changePlayStatus(item,index)}}>
                                                {item.play ? 
                                                    <PauseBtn/> : <PlayBtn/>
                                                }
                                            </span>
                                            <span title="设为背景音乐" onClick={()=>{this.props.frameActions.changeMusicUrl(item.url,this.props.currentMusicPlaying)}} style={{marginLeft:10}}><SetBtn/></span>
                                        </td>
                                    </tr>
                                )}
                                
                            </tbody>
                            
                        </table> : <p>暂无歌曲列表</p>
                    }
                    
                </div>
            </div>
        )
    }
}

//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('addsong')
  }
  //将action的所有方法绑定到props上
  function mapDispatchToProps(dispatch) {
    return {
        addsongActions:bindActionCreators(AddsongActions, dispatch),
        frameActions:bindActionCreators(frameActions, dispatch),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(AddSong)