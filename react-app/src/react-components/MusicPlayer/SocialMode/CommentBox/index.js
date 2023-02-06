import React from "react";
import './styles.css'

class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.commentText = this.props.commentText;
    }

    render() {
        return (
            <span className="commentBox">{this.commentText}</span>
        );
    }
}

export default CommentBox;