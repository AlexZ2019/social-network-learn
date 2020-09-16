import React from "react";
import s from './Message.module.css';

type PropsType = {
    message: string
}

let Message:React.FC<PropsType> = (props) => {
    return (
        <div className={s.message}>
            {props.message}
        </div>
    )
}


export default Message;