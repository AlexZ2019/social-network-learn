import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../../Redux/Reducers/chat-reducer";
import {AppStateType} from "../../../Redux/redux-store";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)


    return <div style={{height: "400px", overflowY: "auto"}}>
        {messages.map((message, index) => <Message key={index} message={message} />)}
    </div>
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: "30px"}} alt=""/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>

}

const AddMessageForm: React.FC = () => {

    const dispatch = useDispatch()
    // let [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")


    let [message, setMessage] = useState("")

    const sendMessageHandler = () => {

        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage("")
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                      value={message} name="" id=""
            >

            </textarea>
        </div>
        <button disabled={false} onClick={sendMessageHandler}>send</button>
    </div>
}

export default ChatPage;