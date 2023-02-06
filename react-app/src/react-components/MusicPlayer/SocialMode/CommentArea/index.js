import React from "react";
import "./styles.css";
import {Button, TextField} from "@mui/material";
import CommentBox from "../CommentBox";
import {fakeComments} from "../../../HardCodedData";

class CommentArea extends React.Component {
    state = {
        input: "",
        comments: []
    }

    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef()
        this.fakeComments = fakeComments;
        this.state.comments = []
        for (let i = 0; i < this.fakeComments.length; i++) {
            this.state.comments.push(<CommentBox commentText={this.fakeComments[i]} key={i}/>);
        }

    }

    clickSend() {
        let input = this.state.input;
        if (input !== "") {
            let comments = this.state.comments;
            let key = comments.length;
            comments.push(<CommentBox commentText={input} key={key}/>)
            this.setState({input: "", comments: comments})
        }
    }

    keyDown = (event) => {
        if (event.keyCode === 13) {
            this.clickSend();
        }
    }

    componentDidUpdate() {
        this.messagesEndRef.current.scrollTop = this.messagesEndRef.current.scrollHeight;
    }

    render() {
        return (
            <div className="commentArea">
                <div className="commentContainer" ref={this.messagesEndRef}>
                    {this.state.comments}
                </div>
                <div className="commentInputArea">
                    <TextField variant="filled" className="commentInput" label="Leave a comment"
                               onKeyDown={(e) => this.keyDown(e)}
                               onChange={(e) => {
                                   this.setState({input: e.target.value})
                               }}
                               value={this.state.input}/>
                    <Button variant="contained" className="commentSendButton"
                            onClick={() => this.clickSend()}>Send</Button>
                </div>
            </div>
        );
    }
}

export default CommentArea;