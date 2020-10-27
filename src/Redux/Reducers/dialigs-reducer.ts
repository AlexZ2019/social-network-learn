// const NEW_MESSAGE_BODY = 'NEW_MESSAGE_BODY';
import {MessageType, UserDialogsType} from "../Types/types";
import {InferActionsTypes} from "../redux-store";

let initialState = {
    users_from_server: [
        {id: 1, name: 'user 1'},
        {id: 2, name: 'user 2'},
        {id: 3, name: 'user 3'},
        {id: 4, name: 'user 4'},
        {id: 5, name: 'user 5'}
    ] as Array<UserDialogsType>,
    messages_from_server: [
        {id: 1, message: 'Message 1'},
        {id: 2, message: 'Message 2'},
        {id: 3, message: 'Message 3'},
        {id: 4, message: 'Message 4'},
        {id: 5, message: 'Message 5'},
    ] as Array<MessageType>
};
type InitialStateType = typeof initialState;
const dialogsReducer = (state = initialState, action: Actions): InitialStateType => {
            // if (action.type === NEW_MESSAGE_BODY) {
        //
        //     return {
        //         ...state,
        //     newMessageBodyState: action.newMessageBody
        //     }
        // } else
            if (action.type === "DIALOGS_REDUCER_ADD_MESSAGE") {
            let newMessage = action.newMessageBody
            return {
                ...state,
                messages_from_server: [...state.messages_from_server, {id: state.messages_from_server.length + 1, message: newMessage}]
            };
        }

        return state;
    };
// export const newMessageBodyActionCreator = (newMessageBody) => {
//     return {
//         type: NEW_MESSAGE_BODY,
//         newMessageBody: newMessageBody
//     }
// };
export type Actions = InferActionsTypes<typeof actions>

export const actions = {
    AddMessageActionCreator: (newMessageBody: string) => {
        return {
            type: "DIALOGS_REDUCER_ADD_MESSAGE",
            newMessageBody
        } as const
    }
}

export default dialogsReducer;