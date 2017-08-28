import axios from 'axios'
import 'babel-polyfill'
const BASE_URL='http://192.168.31.204:8989'
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
    getBannerIndexItem:{
        url:BASE_URL+'/api/app/index/getBannerIndexItem',
        method:'post'
    }

}
const XHR=(name,jsondata,loadtype)=>{
    console.log(name)
    console.log(jsondata)
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
                        console.log(err.response);
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
                    console.log(res)
                    if(res.data){
                        resolve(res.data)
                    }
                    
                })
                .catch(err=>{
                    if(err.response){
                        console.log(err.response);
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