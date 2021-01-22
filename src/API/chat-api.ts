type SubscriberType = (messages: ChatMessageType[]) => void

let ws: WebSocket | null;

let subscribers = [] as SubscriberType[]

const reconnectWsChannel = () => {
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessage))
}

function createChannel() {
    ws?.removeEventListener("close", reconnectWsChannel);
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", reconnectWsChannel)
    ws.addEventListener("message", messageHandler)
}

export const chatApi = {

    start() {
        createChannel()
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener("close", reconnectWsChannel);
        ws?.removeEventListener("message", messageHandler);
        ws?.close();
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter(s => s !== callback);
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message)
    }

}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}