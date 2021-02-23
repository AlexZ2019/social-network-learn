import React, {useEffect, useRef, useState} from "react";
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

    const wsStatus = useSelector((state: AppStateType) => state.chat.status);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {wsStatus === "error" && <div>Error. Please, reload the page</div>}
        <Messages />
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = React.memo(() => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    let [isAutoScroll, setAutoScroll] = useState(true)

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }

    },[messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true)
        }
        else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    return <div style={{height: "400px", overflowY: "auto"}} onScroll={scrollHandler}>
        {messages.map((message, index) => <Message key={message.id} message={message} />)}
    <div ref={messagesAnchorRef}>

    </div>
    </div>
})

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return <div>
        <img src={message.photo} style={{width: "30px"}} alt=""/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>

}

const AddMessageForm: React.FC = () => {
    const wsStatus = useSelector((state: AppStateType) => state.chat.status);
    const dispatch = useDispatch()

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
        <button disabled={wsStatus === "pending"} onClick={sendMessageHandler}>send</button>
    </div>
}

export default ChatPage;