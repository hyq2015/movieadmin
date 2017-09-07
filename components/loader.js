import React,{Component} from 'react';
import '../src/styles/loader.less'
export default class Loader extends Component{
    render(){
        return(
            <div id="pageLoader">
                <h1>Loading...</h1>
                <div className="slider">
                    <div className="line"></div>
                    <div className="break dot1"></div>
                    <div className="break dot2"></div>
                    <div className="break dot3"></div>
                </div>
            </div>
            
        )
    }
}