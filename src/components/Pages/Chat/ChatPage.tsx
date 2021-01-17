import React, {useEffect, useState} from "react";

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

    let [wsChannel, setWsChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;
        const reconnectWsChannel = () => {
            setTimeout(createChannel, 3000)
        }
        function createChannel() {
            if(ws !== null) {
                ws.removeEventListener("close", reconnectWsChannel)
            }
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", reconnectWsChannel)
            setWsChannel(ws);
        }
        createChannel()

        return () => {
            ws.removeEventListener("close", reconnectWsChannel);
            ws.close();
        }

    }, [])

    useEffect(() => {
        wsChannel?.addEventListener("close", () => {
            // setTimeout(createChannel, 3000)
        })
    }, [wsChannel])

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddMessageForm wsChannel={wsChannel}/>
    </div>
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    let [messages, setMessages] = useState<ChatMessageType[]>([])
    
    useEffect(() => {
        const setMessagesHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)

            setMessages((prevMessages) =>[...prevMessages, ...newMessages])
        };
        wsChannel?.addEventListener("message", setMessagesHandler)
        return wsChannel?.removeEventListener("message", setMessagesHandler)
    }, [wsChannel])

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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

    let [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")

    useEffect(() => {
        const setOpenedWsChannel = () => {
            setReadyStatus("ready")
        };
        wsChannel?.addEventListener("open", setOpenedWsChannel)

        return wsChannel?.removeEventListener("open", setOpenedWsChannel)
    },[wsChannel])

    let [message, setMessage] = useState("")

    const sendMessage = () => {
        if (!message) {
            return
        }
        wsChannel?.send(message)
        setMessage("")
    }

    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} name="" id="">

            </textarea>
        </div>
        <button disabled={wsChannel == null && readyStatus !== "ready"} onClick={sendMessage}>send</button>
    </div>
}

export default ChatPage;