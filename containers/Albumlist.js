import React ,{Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as albumListActions from '../actions/albumlistActions'
import * as frameActions from '../actions/frameActions'
import PUBLIC from '../src/js/public'
import '../src/styles/gallery.scss'
let loaded=1;
class Albumlist extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        // this.props.addmovieActions.getQiniuToken();
        if(this.props.albumlist.length<1){
            this.props.FrameActions.changeLoaderStatus(true)
            this.props.albumActions.getAlbumList({pageNo:1,pageSize:1000},this.props.history)
        }else{
            let elem=document.querySelector('.m-p-g');
            let gallery = new MaterialPhotoGallery(elem);
            
        }
    }
    componentDidUpdate(){
        if(loaded==1 && this.props.dataLoaded){
            loaded=2;
            let elem=document.querySelector('.m-p-g');
            let gallery = new MaterialPhotoGallery(elem);
        }
    }
    componentWillUnmount(){
        loaded=1;
    }
    render(){
        return(
            <div id="albumlistcontainer">
                <div className="m-p-g">
                    <div className="m-p-g__thumbs" data-google-image-layout data-max-height="100">
                        {this.props.albumlist.map((item,index)=>
                            <img key={index} src={item.imgurl+PUBLIC.cropImg(100,100)} style={{marginRight:5}} data-full={item.imgurl} className="m-p-g__thumbs-img" />
                        )}
                    </div>

                    <div className="m-p-g__fullscreen"></div>
                </div>
            </div>
        )
    }
}
//将state.counter绑定到props的counter
function mapStateToProps(state) {
    return state.get('albumlist')
  }
  //将action的所有方法绑定到props上
  function mapDispatchToProps(dispatch) {
    return {
        albumActions:bindActionCreators(albumListActions, dispatch),
        FrameActions:bindActionCreators(frameActions, dispatch)
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Albumlist)