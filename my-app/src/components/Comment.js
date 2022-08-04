import React, {Component} from 'react';
import {getDayOfWeek, getTwelveHourTime} from "../helpers/DateTime";

class Comment extends Component {
    render() {
        const {name, message, created} = this.props.data;
        const date = new Date(created);

        const dayOfWeek = getDayOfWeek(date);
        const time = getTwelveHourTime(date);

        return <div className='comment'>
            <p>{message}</p>
            <span>{name} on {dayOfWeek} at {time}</span>
        </div>
    }
}

export default Comment;