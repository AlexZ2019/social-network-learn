import React, {Component} from "react";
import s from './Message.module.css';

class Message extends Component {
    render(props) {
        return (
            <div className={s.message}>
                {this.props.message}
            </div>
        )
    }
}



export default Message;