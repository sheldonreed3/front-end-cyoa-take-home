import React, {Component} from 'react';
import Comment from './Comment';
import {Api} from '../api/index';

class CommentSection extends Component {
    constructor(props) {
        super (props);

        this.state = {
            comments: {}
        };

    }

    componentDidMount() {
        Api.get('http://localhost:3001/getComments').then(data => {
            this.setState({
                comments: data,
            })
        });
    }

    render() {
        const {comments} = this.state;

        return (<div className='comments'>
            {comments.length ? comments.map((comment, index) =>
                <Comment data={comment} key={index} />
            ):''}
        </div>)
    }
}

export default CommentSection;