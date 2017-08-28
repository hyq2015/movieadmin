import React,{Component} from 'react';
import '../src/styles/preloadimgtag.less'
import PUBLIC from '../src/js/public'

function getTopValue(ele){
    let elem=ele;
    let elemTop=elem.offsetTop;
    elem=elem.offsetParent;
    while(elem!=null){
        elemTop+=elem.offsetTop;
        elem=elem.offsetParent;
    }
    return elemTop
}
export default class PreloadImgTag extends Component{
    constructor(props){
        super(props);
        this.state={
            imgurl:''
        }
        this.changeSrc=this.changeSrc.bind(this);
    }
    componentDidMount(){
        this.setState({
            imgurl:this.props.imgcrop ? PUBLIC.defaultPreLoadImg+this.props.imgcrop : PUBLIC.defaultPreLoadImg
        })
        this.changeSrc();
        window.addEventListener('scroll',this.changeSrc,false)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.changeSrc,false)
    }
    changeSrc(){
        let currentTop=getTopValue(this.refs.preloadImg)
        if(document.body.scrollTop+window.innerHeight>=currentTop-100){
            let realLoadImgurl=this.props.imgcrop ? this.props.imgurl+this.props.imgcrop : this.props.imgurl;
            if(this.state.imgurl!=realLoadImgurl){
                this.setState({
                    imgurl:realLoadImgurl
                })
            }
            
        }
        
    }
   
    render(){
        let defaultStyle={display:'inline-block',fontSize:0};
        let newStyle=Object.assign({},defaultStyle,this.props.imgstyle)
        return(
            <div ref="preloadImg" className={this.props.RclassName ? `preloadimgtag ${this.props.RclassName}` : 'preloadimgtag'} style={newStyle}>
                <img src={this.state.imgurl} style={{width:'100%',height:'100%'}}/>
            </div>
        )
    }
}