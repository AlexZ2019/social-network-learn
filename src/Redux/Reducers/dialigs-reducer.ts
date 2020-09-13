// const NEW_MESSAGE_BODY = 'NEW_MESSAGE_BODY';
const ADD_MESSAGE = 'ADD_MESSAGE';

type UserType = {
    id: number
    name: string
}

type MessageType = {
    id: number,
    message: string
}
let initialState = {
    users_from_server: [
        {id: 1, name: 'user 1'},
        {id: 2, name: 'user 2'},
        {id: 3, name: 'user 3'},
        {id: 4, name: 'user 4'},
        {id: 5, name: 'user 5'}
    ] as Array<UserType>,
    messages_from_server: [
        {id: 1, message: 'Message 1'},
        {id: 2, message: 'Message 2'},
        {id: 3, message: 'Message 3'},
        {id: 4, message: 'Message 4'},
        {id: 5, message: 'Message 5'},
    ] as Array<MessageType>
};
type InitialStateType = typeof initialState;
const dialogsReducer = (state = initialState, action: any): InitialStateType => {
            // if (action.type === NEW_MESSAGE_BODY) {
        //
        //     return {
        //         ...state,
        //     newMessageBodyState: action.newMessageBody
        //     }
        // } else
            if (action.type === ADD_MESSAGE) {
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

type AddMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}
export const AddMessageActionCreator = (newMessageBody: string): AddMessageActionCreatorType => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    }
}
export default dialogsReducer;