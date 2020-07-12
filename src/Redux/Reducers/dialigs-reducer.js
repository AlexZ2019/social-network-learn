// const NEW_MESSAGE_BODY = 'NEW_MESSAGE_BODY';
const ADD_MESSAGE = 'ADD_MESSAGE';

let initialState = {
    users_from_server: [
        {id: 1, name: 'user 1'},
        {id: 2, name: 'user 2'},
        {id: 3, name: 'user 3'},
        {id: 4, name: 'user 4'},
        {id: 5, name: 'user 5'}
    ],
    messages_from_server: [
        {message: 'Message 1'},
        {message: 'Message 2'},
        {message: 'Message 3'},
        {message: 'Message 4'},
        {message: 'Message 5'},
    ]
};
const dialogsReducer = (state = initialState, action) => {
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
                messages_from_server: [...state.messages_from_server, {message: newMessage}]
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
export const AddMessageActionCreator = (newMessageBody) => {
    return {
        type: ADD_MESSAGE,
        newMessageBody
    }
}
export default dialogsReducer;