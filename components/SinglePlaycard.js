import React,{Component} from 'react';
import '../src/styles/singleplaycard.less';
import PUBLIC from '../src/js/public';
import PreloadImgTag from './PreloadImgTag'
export default class SinglePlaycard extends Component{
    constructor(props){
        super(props)

    }
     shouldComponentUpdate(nextProps, nextState){
        return this.props.idIndex!==nextProps.idIndex
    }
    render(){
        return(
            <div className="singleplay-card" onClick={()=>this.props.toTheme(this.props.cardIndex)}>
                <h3 className="singleplay-cardtitle">{this.props.title}</h3>
                <p className="singleplay-carddesc">“{this.props.desc}”</p>
                <div style={{overflow:'hidden'}}>
                    {this.props.imgarr.map((item,index)=>{
                        let imgstyle={
                            float:(index+1)%2==1 ? 'left' : 'right'
                        }
                        return(
                            <PreloadImgTag
                                key={index}
                                imgurl={item.imgurl}
                                imgcrop={PUBLIC.cropImg(186,150)}
                                RclassName="singleplaycard-img"
                                imgstyle={imgstyle}
                            />
                        )
                    }
                    )}
                </div>
                
            </div>
        )
    }
}