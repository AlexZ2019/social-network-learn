import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {chatApi, ChatMessageAPIType, WsStatus} from "../../API/chat-api";
import {Dispatch} from "redux";
import {v1} from "uuid";

let initialState = {
    messages: [] as ChatMessageType[],
    status: "pending" as WsStatus
};

export type InitialStateType = typeof initialState
export type ChatMessageType = ChatMessageAPIType & {id: string}
const chatReducer = (state = initialState, action: Actions) : InitialStateType => {
    switch (action.type) {
        case "GET_GROUP_CHAT_MESSAGES":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((m, index, array) => {
                    return index >= array.length - 100
                })
            }

        case "STATUS_CHANGED":
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state;
    }
};

// Action Creators V

type Actions = InferActionsTypes<typeof Actions>

const Actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => {
        return {
            type: "GET_GROUP_CHAT_MESSAGES",
            payload: {messages}
        } as const
    },
    statusChanged: (status: WsStatus) => {
        return {
            type: "STATUS_CHANGED",
            payload: {status}
        } as const
    }
}

type ThunkType = BaseThunkType<Actions | FormAction>

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(Actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _newWsStatusHandler: ((status: WsStatus) => void) | null = null;

const newWsStatusHandlerCreator = (dispatch: Dispatch) => {
    if (_newWsStatusHandler === null) {
        _newWsStatusHandler = (status) => {
            dispatch(Actions.statusChanged(status))
        }
    }

    return _newWsStatusHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start();
    chatApi.subscribe( "messages-received", newMessageHandlerCreator(dispatch));
    chatApi.subscribe( "status-changed", newWsStatusHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe("messages-received", newMessageHandlerCreator(dispatch));
    chatApi.unsubscribe("status-changed", newWsStatusHandlerCreator(dispatch));
    chatApi.stop();
}

export const sendMessage = (message: string): ThunkType => async dispatch => {
    chatApi.sendMessage(message)
}

export default chatReducer;