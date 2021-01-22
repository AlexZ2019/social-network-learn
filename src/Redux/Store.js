import profileReducer from "./Reducers/profile-reducer";
import dialogsReducer from "./Reducers/dialigs-reducer";
import menuReducer from "./Reducers/menu-reducer";

const ADD_POST = 'ADD-POST';
const USER_TEXT_POST_WRITE = 'USER-TEXT-POST-WRITE';
const NEW_MESSAGE_BODY = 'NEW_MESSAGE_BODY';
const ADD_MESSAGE = 'ADD_MESSAGE';
let store = {
    _state: {
        profile: {
            posts_from_server: [
                {post: 'message 1'},
                {post: 'message 2'},
                {post: 'message 3'},
                {post: 'message 4'},
                {post: 'message 5'},
                {post: 'message 6'},
                {post: 'message 7'},
                {post: 'message 8'},
                {post: 'message 9'},
            ],
            newPostText: ''  // Text in input but hasn't sent yet
        },
        dialogs: {
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
            ],
            // newMessageBodyState: ''
        },
        menu: {}
    },
    getState() {
        return this._state
    },
    _callSubscriber () {

    },
    // subscribe (observer) {
    //     this._callSubscriber = observer;    //observer - it's a pattern!!! //  publisher-subscriber
    // },
    // addPost () {
        // let newPost = {
        //     post: this._state.profile.newPostText
        // };
        // this._state.profile.posts_from_server.push(newPost);
        // this._state.profile.newPostText = '';
        // this._callSubscriber(this._state);
    // },
    // user_text_post_write (newText) { // function sends a text to this state what user write in input before creating a post
        // this._state.profile.newPostText = newText;
        // this._callSubscriber(this._state);
    // },
    dispatch (action) { // action - object witch describes what need to do          {type: 'ADD-POST'}
        //     if (action.type === 'ADD-POST') {
        //         let newPost = {
        //             post: this._state.profile.newPostText
        //         };
        //         this._state.profile.posts_from_server.push(newPost);
        //         this._state.profile.newPostText = '';
        //         this._callSubscriber(this._state);
        //     } else
        //         if (action.type === 'USER-TEXT-POST-WRITE') {
        //             this._state.profile.newPostText = action.newText;
        //             this._callSubscriber(this._state);
        //     } else if (action.type === 'NEW_MESSAGE_BODY') {
        //             this._state.dialogs.newMessageBodyState = action.newMessageBody;
        //             this._callSubscriber(this._state);
        //         }
        //         else if (action.type === 'ADD_MESSAGE') {
        //             let newMessage = {
        //               message: this._state.dialogs.newMessageBodyState
        //             };
        //             this._state.dialogs.messages_from_server.push(newMessage);
        //             this._state.dialogs.newMessageBodyState = '';
        //             this._callSubscriber(this._state);
        //         }
        // }
        this._state.profile = profileReducer(this._state.profile, action);
        this._state.dialogs = dialogsReducer(this._state.dialogs, action);
        this._state.menu = menuReducer(this._state.menu, action);
        this._callSubscriber(this._state);
    }
};

// export const addPostActionCreator = () => {
//   return {
//       type: ADD_POST
//   }
// };
// export const  userTextPostWriteActionCreator = (new_post_element) => {
//     return {
//         type: USER_TEXT_POST_WRITE,
//         newText: new_post_element
//     }
// };
// export const newMessageBodyActionCreator = (newMessageBody) => {
//   return {
//       type: NEW_MESSAGE_BODY,
//       newMessageBody: newMessageBody
//   }
// };
// export const AddMessageActionCreator = () => {
//   return {
//       type: ADD_MESSAGE
//   }
// };
window.state = store._state;
// export default store;