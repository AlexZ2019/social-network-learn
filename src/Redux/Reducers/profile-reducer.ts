import {ProfileAPI} from "../../API/api";
import {stopSubmit} from "redux-form";
import {getStateType, PhotosType, PostType, ProfileType} from "../Types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

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
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    userStatus: ''
};

type InitialStateType = typeof initialState;
const profileReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                posts_from_server: [...state.posts_from_server, {id: state.posts_from_server.length + 1,post: action.newPost}],
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
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPost: string
}
export const addPostActionCreator = (newPost: string): AddPostActionCreatorType => {
    return {
        type: ADD_POST,
        newPost
    }
};

type DeletePostType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): DeletePostType => {
    return {
        type: DELETE_POST,
        postId
    }
};

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => (
    {
        type: SET_USER_PROFILE,
        profile
    }
)

type SetUserStatusType = {
    type: typeof SET_USER_STATUS,
    status: string
}
export const setUserStatus = (status: string): SetUserStatusType => (
    {type: SET_USER_STATUS, status}
)

type SetNewPhotoSuccessType = {
    type: typeof SAVE_NEW_PHOTO_SUCCESS,
    photos: PhotosType
}
export const setNewPhotoSuccess = (photos: PhotosType): SetNewPhotoSuccessType => {
    return {
        type: SAVE_NEW_PHOTO_SUCCESS,
        photos
    }
}
type Actions = AddPostActionCreatorType | DeletePostType | SetUserProfileType | SetUserStatusType | SetNewPhotoSuccessType
type ThisDispatch = Dispatch<Actions>
type Thunk = ThunkAction<Promise<void>, AppStateType, unknown, Actions>
export const getProfile = (userId: number): Thunk => {
    return async (dispatch) => {
        let response = await ProfileAPI.getProfile(userId)
        dispatch(setUserProfile(response.data))
    }
}
export const getUserStatus = (userId: number): Thunk => async (dispatch) => {
        let response = await ProfileAPI.getUserStatus(userId)
        dispatch(setUserStatus(response.data))
}
// old use with then
export const updateUserStatus = (status: string) => {
    return (dispatch: any) => {
        try {
            ProfileAPI.updateUserStatus(status).then((response: any) => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            })    
        }
        catch (e) {

        }
        
    }
}

export const saveNewPhoto = (photo: any): Thunk => async (dispatch) => {
    let response = await ProfileAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setNewPhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileData = (profileData: ProfileType): Thunk => async (dispatch: any, getState: any) => {
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