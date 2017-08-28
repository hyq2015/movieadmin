import React,{Component} from 'react';
import '../src/styles/bottomloader.less';
export default class Loader extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let realLoader='';
        if(this.props.loadMore && !this.props.loading){
            realLoader=<div style={{height:50,textAlign:'center',lineHeight:'50px',color:'#bbbbbb',fontSize:12}}>上拉加载更多</div>
        }else if(this.props.loadMore && this.props.loading){
            realLoader=<img className="loaderImg" src="http://cdn.genwoshua.com/refreshing.png" alt="" /> 
        }else if(!this.props.loadMore && !this.props.loading){
           realLoader= <div style={{height:50,textAlign:'center',lineHeight:'50px',color:'#bbbbbb',fontSize:12}}>{this.props.endmsg ? this.props.endmsg : '没有更多啦'}</div>
        }
        return(
            <div className="bottomloader" id="pageBottomLoader">
                {realLoader}
            </div>
        )
    }
}