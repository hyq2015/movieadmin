import React ,{Component} from 'react'
import Loader from './bottomLoader'
import '../src/styles/rscroll.less'
let contentHeight=0;
let loadingStatus=false;
export default class Rscroller extends Component{
    constructor(props){
        super(props)
        this.onScroll=this.onScroll.bind(this)
        this.refreshScroll= this.refreshScroll.bind(this)
    }
    componentDidMount(){
        window.addEventListener('scroll',this.onScroll,false)
        contentHeight=this.refs.Rscroller.offsetHeight;
        console.log(contentHeight)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.onScroll,false)
    }
    componentDidUpdate(){
        this.refreshScroll()
    }
    refreshScroll(){
        if(contentHeight!=this.refs.Rscroller.offsetHeight){
            contentHeight=this.refs.Rscroller.offsetHeight
        }
        if(document.body.scrollTop>contentHeight-window.innerHeight-50){
            if(!this.props.loading){
                this.props.loadMoreData()
            }
            
        }
    }
    onScroll(){
        this.refreshScroll();
    }
    
    render(){
        return(
            <div className="R-inifinite-scroll" ref="Rscroller">
                {this.props.children}
                <Loader
                    loadMore={this.props.loadMore}
                    loading={this.props.loading}
                />
            </div>
        )
    }
}