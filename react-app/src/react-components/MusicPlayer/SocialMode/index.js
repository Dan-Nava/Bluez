import React from 'react';
import './styles.css'
import SpectrumViewer from "./SpectrumViewer";
import CommentArea from "./CommentArea";

class SocialMode extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.state;
        this.spectrumViewer = React.createRef();
    }

    stateChangeHandler() {
        // this.spectrumViewer.current.stateChangeHandler();
    }

    render() {
        return (
            <div className="socialContainer">
                {/*<SpectrumViewer ref={this.spectrumViewer} audio_object={this.props.audio_object}/>*/}
                <CommentArea/>
            </div>
        );
    }
}

export default SocialMode;