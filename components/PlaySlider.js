import React,{Component} from 'react';
import '../src/styles/playslider.less';
import PUBLIC from '../src/js/public';
import PreloadImgTag from './PreloadImgTag'
let bannerimgstyle={
    width:'100%',height:150
}
var timer=null;
var currentActive=0,
reverseCurrentActive=0,
currentActiveCircle=0,
touchStartX=0,
touchEndX=0,
touchStartY=0,
lastTouchEndTime=0;
var timerOutKeepInterval=null;
var pauseStatus=false;
var moveAction=true;
var rootScopeTimer=null;
var newScroll=null;
const playStyle={
    paddingBottom:50,
    minHeight:'calc(100vh - 50px)'
};
var scrollerHeight=0;
var touchStarttimestr=0;
var touchEndttimestr=0;

function stopDefault(e){
    e.preventDefault();
    
}

export default class PlaySlider extends Component{
    constructor(props){
        super(props);
        this.state={
            bannerOpacity:1,
            currentActiveCircle:this.props.currentActiveCircle,
            reverseCurrentActive:this.props.reverseCurrentActive,
            bannerImgs:this.props.bannerImgs,
            reverseBannerImgs:this.props.reverseBannerImgs,
            leftOriention:this.props.leftOriention
        }
        this.imgLoadFinish=this.imgLoadFinish.bind(this);
        this.clearInterval=this.clearInterval.bind(this);
        this.handleMove=this.handleMove.bind(this);
        this.keepInterval=this.keepInterval.bind(this);
        this.totalTimer=this.totalTimer.bind(this);
    }
    componentDidMount(){
        this.totalTimer();
    }
    componentWillUnmount(){
        clearInterval(timer);
        clearInterval(rootScopeTimer);
        timer=null;
        rootScopeTimer=null;
        this.props.saveBannerSetting(this.state);
    }
    totalTimer(){
        let _this=this;
        rootScopeTimer=setInterval(function(){
            if(!timer){
                let newtime=Date.now();
                if(newtime-lastTouchEndTime>=4000){
                    timer=setInterval(()=>_this.timerInterval(),2000)
                }
            }
        },1000)
        
    }
    reverseInterval(){//向右
        if(this.state.bannerImgs.length<1){
            return
        }
        let newState=_.clone(this.state);
        newState.leftOriention=false;
        let imgarr=newState.reverseBannerImgs;
        let currentActiveCircle=newState.currentActiveCircle;
        let reverseCurrentActive=imgarr.length-newState.currentActive;
        if(reverseCurrentActive==imgarr.length){
            reverseCurrentActive=0;
        }
        reverseCurrentActive+=1;
        if(reverseCurrentActive>=imgarr.length){
            reverseCurrentActive=0;
        }
        for(let i=0;i<imgarr.length;i++){
            imgarr[i].opacity=0;
            imgarr[i].zIndex=200;
        }
        if(reverseCurrentActive===0){
            imgarr[reverseCurrentActive].trans='translateX(0) translateZ(0) translate3d(0px, 0px, 0px)';
            imgarr[reverseCurrentActive+1].trans='translateX(100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[imgarr.length-1].trans='translateX(-100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            
            imgarr[reverseCurrentActive].zIndex=300;
            imgarr[reverseCurrentActive+1].zIndex=200;
            imgarr[imgarr.length-1].zIndex=200;

            imgarr[reverseCurrentActive].opacity=1;
            imgarr[reverseCurrentActive+1].opacity=0.6;
            imgarr[imgarr.length-1].opacity=0.6;
            currentActiveCircle=reverseCurrentActive;
        }else if(reverseCurrentActive===1){
            imgarr[imgarr.length-1].trans='translateX(0) translateZ(0) translate3d(0px, 0px, 0px)';
            imgarr[reverseCurrentActive-1].trans='translateX(100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[imgarr.length-2].trans='translateX(-100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            
            imgarr[imgarr.length-1].zIndex=300;
            imgarr[reverseCurrentActive-1].zIndex=200;
            imgarr[imgarr.length-2].zIndex=200;

            imgarr[imgarr.length-1].opacity=1;
            imgarr[reverseCurrentActive-1].opacity=0.6;
            imgarr[imgarr.length-2].opacity=0.6;
            currentActiveCircle=imgarr.length-1;
        }else if(reverseCurrentActive>1 && reverseCurrentActive<imgarr.length){
            imgarr[imgarr.length-reverseCurrentActive].trans='translateX(0) translateZ(0) translate3d(0px, 0px, 0px)';
            imgarr[imgarr.length+1-reverseCurrentActive].trans='translateX(100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[imgarr.length-1-reverseCurrentActive].trans='translateX(-100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            
            imgarr[imgarr.length-reverseCurrentActive].zIndex=300;
            imgarr[imgarr.length+1-reverseCurrentActive].zIndex=200;
            imgarr[imgarr.length-1-reverseCurrentActive].zIndex=200;

            imgarr[imgarr.length-reverseCurrentActive].opacity=1;
            imgarr[imgarr.length+1-reverseCurrentActive].opacity=0.6;
            imgarr[imgarr.length-1-reverseCurrentActive].opacity=0.6;
            currentActiveCircle=imgarr.length-reverseCurrentActive;
        }
        newState.reverseCurrentActive=reverseCurrentActive;
        newState.currentActiveCircle=currentActiveCircle;
        
        
        newState.currentActive=imgarr.length-newState.reverseCurrentActive;
        if(newState.currentActive==imgarr.length){
            newState.currentActive=0;
        }
        this.setState(newState)
    }
    timerInterval(){//向左
        if(this.state.bannerImgs.length<1){
            return
        }
        let newState=_.clone(this.state);
        newState.leftOriention=true;
        let currentActiveCircle=newState.currentActiveCircle;
        let _this=this;
        let imgarr=newState.bannerImgs;
        let currentActive=imgarr.length-newState.reverseCurrentActive;
        if(currentActive==imgarr.length){
            currentActive=0;
        }
        currentActive+=1;
        if(currentActive>=imgarr.length){
            currentActive=0;
        }
        for(let i=0;i<imgarr.length;i++){
            imgarr[i].opacity=0;
            imgarr[i].zIndex=200;
        }
        if(currentActive===0){
            imgarr[currentActive].trans='translateX(0) translateZ(0) translate3d(0px, 0px, 0px)';
            imgarr[currentActive+1].trans='translateX(100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[imgarr.length-1].trans='translateX(-100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[currentActive].zIndex=300;
            imgarr[currentActive+1].zIndex=200;
            imgarr[imgarr.length-1].zIndex=200;
            imgarr[currentActive].opacity=1;
            imgarr[currentActive+1].opacity=0.6;
            imgarr[imgarr.length-1].opacity=0.6;
            currentActiveCircle=0;
        }else if(currentActive<=imgarr.length-2 && currentActive>0){
            imgarr[currentActive].trans='translateX(0) translateZ(0) translate3d(0px, 0px, 0px)';
            imgarr[currentActive-1].trans='translateX(-100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[currentActive+1].trans='translateX(100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[currentActive].zIndex=300;
            imgarr[currentActive-1].zIndex=200;
            imgarr[currentActive+1].zIndex=200;
            imgarr[currentActive].opacity=1;
            imgarr[currentActive+1].opacity=0.6;
            imgarr[currentActive-1].opacity=0.6;
            currentActiveCircle=currentActive;
        }else if(currentActive==imgarr.length-1){
            imgarr[currentActive].trans='translateX(0) translateZ(0) translate3d(0px, 0px, 0px)';
            imgarr[0].trans='translateX(100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[currentActive-1].trans='translateX(-100px) translateZ(-100px) translate3d(0px, 0px, 0px)';
            imgarr[currentActive].zIndex=300;
            imgarr[currentActive-1].zIndex=200;
            imgarr[0].zIndex=200;
            imgarr[currentActive].opacity=1;
            imgarr[currentActive-1].opacity=0.6;
            imgarr[0].opacity=0.6;
            currentActiveCircle=currentActive;
        }
        newState.currentActive=currentActive;
        newState.currentActiveCircle=currentActiveCircle;
        
        
        newState.reverseCurrentActive=imgarr.length-currentActive;
        if(newState.reverseCurrentActive==imgarr.length){
            newState.reverseCurrentActive=0;
        }
        this.setState(newState)
    }
    clearInterval(e){
        touchStarttimestr=Date.now();
        pauseStatus=true;
        touchStartX=e.touches[0].pageX;
        touchStartY=e.touches[0].pageY;
        window.clearInterval(timer);
        timer=null;
    }
    keepInterval(e){
        
        if(touchEndX===0){
            touchEndX=touchStartX
        }
        lastTouchEndTime=Date.now();
        let _this=this;
        if(touchEndX-touchStartX<=-50){
            this.timerInterval();
        }else if(touchEndX-touchStartX>=50){
            this.reverseInterval()
        }
        touchEndX=touchStartX=0;
        moveAction=true;
        document.getElementById('playBannerShade').removeEventListener('touchmove',stopDefault,false);
        
    }
    handleMove(e){
        touchEndX=e.touches[0].pageX;
        moveAction=false;
        if(Math.abs(touchStartX-touchEndX)>Math.abs(touchStartY-e.touches[0].pageY)){
            document.getElementById('playBannerShade').addEventListener('touchmove',stopDefault,false);
        }else if(Math.abs(touchStartX-touchEndX)<Math.abs(touchStartY-e.touches[0].pageY)){
            document.getElementById('playBannerShade').removeEventListener('touchmove',stopDefault,false);
        }
    }
    imgLoadFinish(index){
        if(index==this.props.bannerImgs.length-1){
            this.setState({
                bannerOpacity:1
            })
        }
    }
    render(){
        return(
            <div className="playslider-container" style={{backgroundColor:this.state.bannerImgs[this.state.currentActiveCircle].bgcolor}}>
                {this.props.children}
                <a 
                    id="playBannerShade" 
                    onTouchStart={(e)=>this.clearInterval(e)} 
                    onTouchMove={(e)=>this.handleMove(e)} 
                    onTouchEnd={(e)=>this.keepInterval(e)}
                    href={this.state.bannerImgs.length > 0 ? this.state.bannerImgs[this.state.currentActiveCircle].link : ''}
                ></a>
                <div className="banner-slider">
                    <div className="slider-wrapper">
                        {this.props.leftOriention ? this.props.bannerImgs.map((item,index)=>{
                            return(
                                <a href={item.link} className={this.state.bannerOpacity==1 ? "img-wrapper hasTransition" : "img-wrapper"} key={index} style={{transform:item.trans,zIndex:item.zIndex,opacity:item.opacity}}>
                                    <PreloadImgTag
                                        imgurl={item.img}
                                        imgcrop={PUBLIC.cropImg(180,150)}
                                        imgstyle={bannerimgstyle}
                                    />
                                    <div className="text-wrap">
                                        <div className="title">{item.title}</div>
                                        <div className="desc">{item.desc}</div>
                                    </div>
                                </a>
                            )
                            
                        }
                            
                        ) :
                        this.props.reverseBannerImgs.map((item,index)=>
                            <a href={item.link} className={this.state.bannerOpacity==1 ? "img-wrapper hasTransition" : "img-wrapper"} key={index} style={{transform:item.trans,zIndex:item.zIndex,opacity:item.opacity}}>
                                <PreloadImgTag
                                    imgurl={item.img}
                                    imgcrop={PUBLIC.cropImg(180,150)}
                                    imgstyle={bannerimgstyle}
                                />
                                <div className="text-wrap">
                                    <div className="title">{item.title}</div>
                                    <div className="desc">{item.desc}</div>
                                </div>
                            </a>
                        )
                        }
                    </div>
                </div>
                <div className="slider-nav">
                    {this.props.bannerImgs.map((item,index)=>
                         <i key={index} className={this.state.currentActiveCircle==index ? 'current' : ''}></i>
                    )}
                </div>
            </div>
        )
    }
}