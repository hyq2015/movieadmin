import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PlayActions from '../actions/playActions'
import * as frameActions from '../actions/frameActions'
import { withRouter } from 'react-router-dom'
import SCROLL_POSITION from '../src/js/catcheState'

import '../src/styles/play.less'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
let u = navigator.userAgent;
let isIos=!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
let pageSize=10;
 class Play extends Component{
    constructor(props){
        super(props)
        this.state={
            loading:false,
            loadMore:true
        }
        this.loadMoreData=this.loadMoreData.bind(this)
        this.showarea=this.showarea.bind(this)
        this.goSearch=this.goSearch.bind(this)
        this.saveBannerSetting=this.saveBannerSetting.bind(this)
    }
    componentWillMount(){
        document.title='好电影'
    }
    componentDidMount(){
        if(this.props.theme.content.length<1){
            this.props.play.fetchData({'pageNo':1,'pageSize':pageSize})
        }
        
        if(this.props.dataLoaded){
           
            let scrollBarPosition=SCROLL_POSITION.getCache(this.props.location.pathname);
            
            if(scrollBarPosition){
                window.scrollTo(0,scrollBarPosition)
            }
        }else{
            window.scrollTo(0,0)
        }
    }
    componentWillUnmount(){
        SCROLL_POSITION.addCatche(this.props.location.pathname,document.body.scrollTop)
    }
    loadMoreData(){
        if(!this.props.theme.last){
            this.props.play.noticeLoading(true)
            this.props.play.fetchData({'page':(this.props.theme.content.length/pageSize)+1,'pageSize':pageSize})
        }
        
    }
    showarea(e){
        e.stopPropagation();
    }
    goSearch(e){
        e.stopPropagation();
    }
    saveBannerSetting(bannersetting){
        this.props.play.saveBannerSetting(bannersetting)
    }
    render(){
        const {theme} =this.props;
        return(
            <div id="playContainer">
                {this.props.lists && this.props.lists.data.length>0 ? 
                    this.props.lists.data.map((item,index)=>
                    <Card key={index}>
                        <CardHeader
                            title="上传者"
                            subtitle="Ricky"
                            avatar="http://wx.qlogo.cn/mmopen/uZcWk3ZyyuBkK9qR0KJL2xtPbnsBeicMOXymCUQQcTBQbkpZicBD556KD5OgOV0m6sETTMxJqGO3FBYnwHGot1p0whORouh0hI/0"
                        />
                        <CardMedia
                            overlay={<CardTitle title={item.name+'('+item.score+')'} subtitle={item.tag ? item.tag : "高分科幻电影"} />}
                            style={{width:300,height:300}}
                        >
                            <img src={item.imgurl} alt="" style={{height:300,width:300}} />
                        </CardMedia>
                        <CardTitle title="上映时间" subtitle={item.releaseTime} />
                        <CardTitle style={{wordBreak:'break-all'}} title="下载地址" subtitle={item.downloadurl} />
                        <CardText style={{wordBreak:'break-all'}}>
                            {item.desc}
                        </CardText>
                    </Card>
                    ) : null
                }                
            </div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
  return state.get('play')
}
//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
  return {
      play:bindActionCreators(PlayActions, dispatch),
      frame:bindActionCreators(frameActions, dispatch)
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Play))