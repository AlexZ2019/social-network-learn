import {FormAction} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {chatApi, ChatMessageType} from "../../API/chat-api";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as ChatMessageType[],
};

export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: Actions) : InitialStateType => {
    switch (action.type) {
        case "GET_GROUP_CHAT_MESSAGES":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
};

// Action Creators V

type Actions = InferActionsTypes<typeof Actions>
const Actions = {
    messagesReceived: (messages: ChatMessageType[]) => {
        return {
            type: "GET_GROUP_CHAT_MESSAGES",
            payload: {messages}
        } as const
    }
}

type ThunkType = BaseThunkType<Actions | FormAction>

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(Actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start();
    chatApi.subscribe(newMessageHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe(newMessageHandlerCreator(dispatch));
    chatApi.start();
}

export const sendMessage = (message: string) => {
    chatApi.sendMessage(message)
}

export default chatReducer;