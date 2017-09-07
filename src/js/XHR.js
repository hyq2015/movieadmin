import axios from 'axios'
import 'babel-polyfill'
import createHistory from 'history/createBrowserHistory'
let history=createHistory();
// const BASE_URL='http://192.168.31.204:8989'
const BASE_URL=''
export const URL={
    'saveAddress':{
        'url':BASE_URL+'/api/user/saveshippingaddr',
        'method':'post'
    },
    'mallInfo':{
        'url':BASE_URL+'/api/app/index/mall/query',
        'method':'post'
    },
    'getMovieList':{
        'url':BASE_URL+'/api/movie/list',
        'method':'get'
    },
    'addmovie':{
        'url':BASE_URL+'/api/movie/add',
        'method':'post'
    },
    'addcodeTemplate':{
        'url':BASE_URL+'/api/codetemplate/add',
        'method':'post'
    },
    'updateCodetemplate':{
        'url':BASE_URL+'/api/codetemplate/update',
        'method':'post'
    },
    'getcodeTemplateList':{
        'url':BASE_URL+'/api/codetemplate/list',
        'method':'get'
    },
    'getQiniuToken':{
        'url':BASE_URL+'/api/uptoken',
        'method':'get'
    },
    'userLogin':{
        'url':BASE_URL+'/api/user/login',
        'method':'post'
    },
    'userLogout':{
        'url':BASE_URL+'/api/user/logout',
        'method':'get'
    },
    'addSong':{
        'url':BASE_URL+'/api/song/add',
        'method':'post'
    },
    'songList':{
        'url':BASE_URL+'/api/song/list',
        'method':'get'
    },
    'userUpdate':{
        'url':BASE_URL+'/api/user/update',
        'method':'post'
    },
    'getUser':{
        'url':BASE_URL+'/api/user/current',
        'method':'get'
    },
    'addAlbum':{
        'url':BASE_URL+'/api/album/add',
        'method':'post'
    },
    'getAlbumList':{
        'url':BASE_URL+'/api/album/list',
        'method':'get'
    },
    'userSignin':{
        'url':BASE_URL+'/api/user/signin',
        'method':'post'
    },
    
    getBannerIndexItem:{
        url:BASE_URL+'/api/app/index/getBannerIndexItem',
        method:'post'
    }

}
const XHR=(name,jsondata,history)=>{
    if(URL[name]){
        if(URL[name].method=='post'){
            return new Promise((resolve, reject)=>{
                REQUESTS.post(URL[name].url,jsondata)
                .then(res=>{
                    console.log(res)
                    if(res.data){
                        resolve(res.data)
                    }
                    
                })
                .catch(err=>{
                    if(err.response){
                        if(err.response.status==403){//未登录
                            // window.location.href='/user/auth';
                            history.replace({
                                pathname:'/user/auth'
                            })
                            // history.replace({
                            //     pathname:'/user/auth'
                            // })
                            return
                        }else{
                            reject({'message':err.response.data.message})
                        }
                    }else if(err.request){
                        console.log(err.request);
                    }else{
                        console.log('Error', err.message);
                    }
                    reject({'message':'你的请求出错啦'})
                })

            })
        }else if(URL[name].method=='get'){
            return new Promise((resolve, reject)=>{
                REQUESTS.get(URL[name].url,jsondata)
                .then(res=>{
                    if(res.data){
                        resolve(res.data)
                    }
                    
                })
                .catch(err=>{
                    if(err.response){
                        console.log(err.response)
                        if(err.response.status==403){//未登录
                            // window.location.href='/user/auth';
                            history.replace({
                                pathname:'/user/auth'
                            })
                            // history.replace({
                            //     pathname:'/user/auth'
                            // })
                            return
                        }else{
                            reject({'message':err.response.data.message})
                        }
                    }else if(err.request){
                        console.log(err.request);
                    }else{
                        console.log('Error', err.message);
                    }
                    reject({'message':'你的请求出错啦'})
                })

            })
        }
    }else{
        return false
    }
}
const REQUESTS={
    post:function(url,jsondata){
        return axios.post(url,jsondata)
    },
    get:function(url,jsondata){
        return axios.get(url,{params:jsondata})
    }
}
export default XHR