import React, {Component} from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'

class SurveyPanel extends Component {
    render(){
        var progressCondition;
        var assetcaller = this.props.category;
        assetcaller = assetcaller+ ".PNG";
        if(this.props.progress <= 30)
            progressCondition = "danger";
        else if(this.props.progress <= 70)
            progressCondition = "warning";
        else
            progressCondition = "info";
        return(
            <>
            <h1 className="text-center">{this.props.category}</h1>
            <div className="wrapper">
                <div className="img-container">
                    <img src={'./assets/hexagon.PNG'} className="panel-border"></img>
                    <div className="small-wrapper">
                        {(() => {
                            // survey not completed yet.
                            if (this.props.score === -1) {
                              return (
                                <ProgressBar now={this.props.progress} variant={progressCondition} className ="progress"></ProgressBar>
                              )
                              // survey completed.
                            } else {
                            return (
                                <>
                                    <img src={'./assets/white.png'} className="points-view"></img>
                                    <div className="points-text">{this.props.score}</div>
                                </>
                              )
                            }
                          })()}
                    </div>
                </div>
                <div className="img-container">
                </div>
            </div>
            </>
        );
    }
};
export default SurveyPanel;