import React, {useEffect, useState} from "react";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const wsChannel = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat: React.FC = () => {


    return <div>
        <Messages/>
        <AddMessageForm/>
    </div>
}

const Messages: React.FC = () => {

    let [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener("message", (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) =>[...prevMessages, ...newMessages])
        })
    }, [])


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

    let [message, setMessage] = useState("")

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel.send(message)
        setMessage("")
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} name="" id="">

            </textarea>
        </div>
        <button onClick={sendMessage}>send</button>
    </div>
}
export default ChatPage;