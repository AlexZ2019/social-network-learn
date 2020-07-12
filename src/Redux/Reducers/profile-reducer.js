import {ProfileAPI} from "../../API/api";

const ADD_POST = 'ADD-POST';
// const USER_TEXT_POST_WRITE = 'USER-TEXT-POST-WRITE';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_DATA';
const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS'
const DELETE_POST = 'social-network/profile/DELETE_POST'

let initialState = {
    posts_from_server: [
        {id: 1, post: 'message 1'},
        {id: 2, post: 'message 2'},
        {id: 3, post: 'message 3'},
        {id: 4, post: 'message 4'},
        {id: 5, post: 'message 5'},
        {id: 6, post: 'message 6'},
        {id: 7, post: 'message 7'},
        {id: 8, post: 'message 8'},
        {id: 9, post: 'message 9'},
    ],
    newPostText: '',
    profile: null,
    userStatus: ''
};
const profileReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts_from_server: [...state.posts_from_server, {post: action.newPost}],
            }
        }
        case DELETE_POST:
            return {
                ...state, posts_from_server: state.posts_from_server.filter(p => p.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state, userStatus: action.status
            }
        default:
            return state;
    }
}
export const addPostActionCreator = (newPost) => {
    return {
        type: ADD_POST,
        newPost
    }
};
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
};
export const setUserProfile = (profile) => (
    {
        type: SET_USER_PROFILE,
        profile
    }
)
export const setUserStatus = (status) => (
    {type: SET_USER_STATUS, status}
)

export const getProfile = (userId) => {
    return async (dispatch) => {
        let response = await ProfileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}
export const getUserStatus = (userId) => async (dispatch) => {
        let response = await ProfileAPI.getUserStatus(userId)
        dispatch(setUserStatus(response.data))
}
// old use with then
export const updateUserStatus = (status) => {
    return (dispatch) => {
        ProfileAPI.updateUserStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        })
    }
}
export default profileReducer