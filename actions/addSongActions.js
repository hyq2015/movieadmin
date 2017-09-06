import types from '../src/js/actiontypes'
import XHR from '../src/js/XHR'
import _ from 'lodash'
import * as frameActions from '../actions/frameActions'
export function Addsong(jsondata){
    return(dispatch,getState)=>{
        XHR('addSong',jsondata)
        .then(res=>{
            dispatch({
                type:types.ADD_SONG,
                payLoad:{
                    song:res.data
                }
            })
            dispatch(frameActions.showSuccessToast('操作成功',2000))
            dispatch(getSongList({pageNo:1,pageSize:1000}))
        })
        .catch(err=>{
            dispatch(frameActions.showModal(err.message));
        })
    }
}
export function getSongList(jsondata){
    return(dispatch,getState)=>{
        XHR('songList',jsondata)
        .then(res=>{
            let originData=res.data;
            let currentPlayUrl=getState().get('addsong').currentPlayMusicUrl;
            let currentMusicPlaying=getState().get('addsong').currentMusicPlaying;

            for(let item of originData){
                if(item.url!=currentPlayUrl){
                    item.play=false;
                }else if(item.url==currentPlayUrl){
                    item.play=currentMusicPlaying;
                }
                
            }
            dispatch({
                type:types.SONG_LIST,
                payLoad:{
                    songList:originData
                }
            })
        })
        .catch(err=>{
            dispatch(frameActions.showModal(err.message));
        })
    }
}

export function changePlayStatus(url,index){
    return(dispatch,getState)=>{
        let originSonglist=_.clone(getState().get('addsong').songList);
        for(let i=0;i<originSonglist.length;i++){
            let item=originSonglist[i];
            if(i!=index){
                item.play=false
            }else{
                item.play=!item.play;
            }
        }
        
        dispatch({
            type:types.CHANGE_SINGLE_PLAY_STATUS,
            payLoad:{
                songList:originSonglist,
                url:url
            }
        })
    }
}

export function pausePlaySingle(){
    return(dispatch,getState)=>{
        let originSonglist=_.clone(getState().get('addsong').songList);
        for(let i=0;i<originSonglist.length;i++){
            let item=originSonglist[i];
            item.play=false
        }
        
        dispatch({
            type:types.PAUSE_SINGLE_MUSIC,
            payLoad:{
                songList:originSonglist
            }
        })
    }
}
