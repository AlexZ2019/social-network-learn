import {ProfileAPI} from "../../API/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
// const USER_TEXT_POST_WRITE = 'USER-TEXT-POST-WRITE';
const SET_USER_PROFILE = 'social-network/profile/SET_USER_DATA';
const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS'
const DELETE_POST = 'social-network/profile/DELETE_POST'
const SAVE_NEW_PHOTO_SUCCESS = "social-network/profile/SAVE_NEW_PHOTO_SUCCESS"

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
        case SAVE_NEW_PHOTO_SUCCESS:
            return {
                ...state,profile: {...state.profile, photos: action.photos}
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

export const setNewPhotoSuccess = (photos) => {
    return {
        type: SAVE_NEW_PHOTO_SUCCESS,
        photos
    }
}

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

export const saveNewPhoto = photo => async dispatch => {
    let response = await ProfileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setNewPhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileData = profileData => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await ProfileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId))
    }
    else {
        dispatch(stopSubmit("profileDataForm", {_error: response.data.messages[0]}))
        // {"contacts": {"facebook": response.data.messages[0]}
        return Promise.reject(response.data.messages[0])
    }
}


export default profileReducer