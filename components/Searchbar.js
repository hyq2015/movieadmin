/**
 * Created by Administrator on 2017/3/31.
 */
import React,{Component} from 'react';
import {render} from 'react-dom';
import '../src/styles/iconfont.css';
import '../src/styles/searchbar.less';
let searchTimes=false;
export  default class Searchbar extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentWillMount(){
     searchTimes=window.sessionStorage.searchTimes ? window.sessionStorage.searchTimes : false;
     sessionStorage.goBack = 'Play'
  }

  render(){
    // let defaultStyle={backgroundColor:'#00c8fb'};
    // let newStyleobj=Object.assign({},defaultStyle,this.props.styleOption);

    return(
      <div className="search-bar">
        <div className="left-part" onClick={this.props.showarea}>
          <span className="city-name">成都</span>
          <span className="icon-icon_down iconfont"></span>
        </div>
        <div className="search-btn" onClick={this.props.goSearch}>
          {this.props.isIos ? <input type="text" unselectable="on" className="fake-input"/> : ''}
          <span className="icon-yw_icon_search1 iconfont" style={{color:'#bbb',fontSize:12}}></span>
          <div className="txt">搜索</div>
        </div>
      </div>
    )
  }
}
