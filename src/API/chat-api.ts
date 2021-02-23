type MessageReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
export type WsStatus = "pending" | "ready" | "error"
type StatusChangedSubscriberType = (status: WsStatus) => void
type EventNames = "messages-received" | "status-changed"

let ws: WebSocket | null;

const subscribers = {
    "messages-received": [] as MessageReceivedSubscriberType[],
    "status-changed": [] as StatusChangedSubscriberType[]
}

const reconnectWsChannel = () => {
    subscribers["status-changed"].forEach(s => s("pending"))
    setTimeout(createChannel, 3000)
}

function cleanUp() {
    ws?.removeEventListener("close", reconnectWsChannel);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener("open", notifySubscribersAboutStatusOpen)
    ws?.removeEventListener("error", notifySubscribersAboutStatusError)
}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessage))
}

function notifySubscribersAboutStatus(status: WsStatus) {
    subscribers["status-changed"].forEach(s => s(status))
}

function notifySubscribersAboutStatusOpen() {
    notifySubscribersAboutStatus("ready")
}

function notifySubscribersAboutStatusError() {
    notifySubscribersAboutStatus("error")
    console.error("RELOAD PAGE")
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscribersAboutStatus("pending")
    ws.addEventListener("close", reconnectWsChannel)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", notifySubscribersAboutStatusOpen)
    ws.addEventListener("error", notifySubscribersAboutStatusError)
}

export const chatApi = {

    start() {
        createChannel()
    },
    stop() {
        subscribers["messages-received"] = [];
        subscribers["status-changed"] = [];
        cleanUp();
        ws?.close();
    },
    subscribe(eventName: EventNames, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {

        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {

            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter((s: MessageReceivedSubscriberType & StatusChangedSubscriberType) => s !== callback);
        }
    },
    unsubscribe(eventName: EventNames, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {

        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter((s: MessageReceivedSubscriberType | StatusChangedSubscriberType) => s !== callback);
        },
    sendMessage(message: string) {
        ws?.send(message)
    }

}

export type ChatMessageAPIType = {
    message: string
    photo: string
    userId: number
    userName: string
}