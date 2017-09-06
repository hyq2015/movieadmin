import types from '../src/js/actiontypes'
const initialState1={
    dataSaved:false,
    songList:[],
    currentPlayMusicUrl:'',
    currentMusicPlaying:false
}
export default function addsong(state=initialState1,action){
    switch (action.type){
        case types.ADD_SONG:
            return{
                ...state,
                song:action.payLoad.song
            }
        case types.SONG_LIST:
            return{
                ...state,
                songList:action.payLoad.songList
            }
        case types.CHANGE_SINGLE_PLAY_STATUS:
            if(state.currentPlayMusicUrl==action.payLoad.url){
                return{
                    ...state,
                    songList:action.payLoad.songList,
                    currentPlayMusicUrl:action.payLoad.url,
                    currentMusicPlaying:!state.currentMusicPlaying
                }
            }else{
                return{
                    ...state,
                    songList:action.payLoad.songList,
                    currentPlayMusicUrl:action.payLoad.url,
                    currentMusicPlaying:true
                }
            }
        case types.PAUSE_SINGLE_MUSIC:
            return{
                ...state,
                currentMusicPlaying:false,
                songList:action.payLoad.songList
            }
        default:
            return state
    }
}