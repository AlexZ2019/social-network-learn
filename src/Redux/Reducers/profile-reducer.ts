import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../Types/types";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {ProfileAPI} from "../../API/profile-api";

// const ADD_POST = 'ADD-POST';
// const USER_TEXT_POST_WRITE = 'USER-TEXT-POST-WRITE';
// const SET_USER_PROFILE = 'social-network/profile/SET_USER_DATA';
// const SET_USER_STATUS = 'social-network/profile/SET_USER_STATUS'
// const DELETE_POST = 'social-network/profile/DELETE_POST'
// const SAVE_NEW_PHOTO_SUCCESS = "social-network/profile/SAVE_NEW_PHOTO_SUCCESS"


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
        case "PROFILE_ADD_POST": {
            return {
                ...state,
                posts_from_server: [...state.posts_from_server, {id: state.posts_from_server.length + 1,post: action.newPost}],
            }
        }
        case "PROFILE_DELETE_POST":
            return {
                ...state, posts_from_server: state.posts_from_server.filter(p => p.id !== action.postId)
            }
        case "PROFILE_SET_USER_PROFILE":
            return {
                ...state, profile: action.profile
            }
        case "PROFILE_SET_USER_STATUS":
            return {
                ...state, userStatus: action.status
            }
        case "PROFILE_SAVE_NEW_PHOTO_SUCCESS":
            return {
                ...state, profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPost: string) => {
        return {
            type: "PROFILE_ADD_POST",
            newPost
        } as const
    },
    deletePost: (postId: number) => {
        return {
            type: "PROFILE_DELETE_POST",
            postId
        } as const
    },
    setUserProfile: (profile: ProfileType) => (
        {
            type: "PROFILE_SET_USER_PROFILE",
            profile
        } as const
    ),
    setUserStatus: (status: string) => (
        {type: "PROFILE_SET_USER_STATUS", status} as const
    ),
    setNewPhotoSuccess: (photos: PhotosType) => {
        return {
            type: "PROFILE_SAVE_NEW_PHOTO_SUCCESS",
            photos
        } as const
    }
}

// type DeletePostType = {
//     type: typeof DELETE_POST,
//     postId: number
// }

// type SetUserProfileType = {
//     type: typeof SET_USER_PROFILE,
//     profile: ProfileType
// }

// type SetUserStatusType = {
//     type: typeof SET_USER_STATUS,
//     status: string
// }

// type SetNewPhotoSuccessType = {
//     type: typeof SAVE_NEW_PHOTO_SUCCESS,
//     photos: PhotosType
// }

type Actions = InferActionsTypes<typeof actions>
// type ThisDispatch = Dispatch<Actions>
// type Thunk = ThunkAction<Promise<void>, AppStateType, unknown, Actions>
type Thunk = BaseThunkType<Actions | FormAction>
export const getProfile = (userId: number): Thunk => {
    return async (dispatch) => {
        let data = await ProfileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data))
    }
}
export const getUserStatus = (userId: number): Thunk => async (dispatch) => {
        let data = await ProfileAPI.getUserStatus(userId)
        dispatch(actions.setUserStatus(data))
}
// old use with then
export const updateUserStatus = (status: string): Thunk => async dispatch => {
        try {
            let data = await ProfileAPI.updateUserStatus(status)
            if (data.resultCode === 0) {
                dispatch(actions.setUserStatus(status))
            }
        }
        catch (e) {

        }
    }

export const saveNewPhoto = (photo: File): Thunk => async (dispatch) => {
    let data = await ProfileAPI.savePhoto(photo)
    if (data.resultCode === 0) {
        dispatch(actions.setNewPhotoSuccess(data.data.photos))
    }
}

export const saveProfileData = (profileData: ProfileType): Thunk => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await ProfileAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        if (userId !== null) {
            await dispatch(getProfile(userId))
        }
        else {
            throw new Error("userId can't be null")
        }
    }
    else {
        dispatch(stopSubmit("profileDataForm", {_error: response.data.messages[0]}))
        // {"contacts": {"facebook": response.data.messages[0]}
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer