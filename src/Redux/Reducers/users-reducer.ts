import {usersAPI} from "../../API/api";
import {updateObjectInArray} from "../../utilities/object-helpers";
import {getStateType, UserType} from "../Types/types";
import {Dispatch} from "redux";
import {AppStateType} from "../redux-store";
import {ThunkAction} from "redux-thunk";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS_FROM_SERVER = 'SET_USERS_FROM_SERVER';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const IS_FOLLOWING_PROGRESS = "IS_FOLLOWING_PROGRESS";


let initialState = {
    users_from_server: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // Array of userIds
};

export type InitialStateType = typeof initialState;
const usersReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users_from_server: updateObjectInArray(state.users_from_server, action.userId, "id", {followed: true})
                // users_from_server: state.users_from_server.map(user_from_server => {
                //     if (user_from_server.id === action.userId) {
                //         return {...user_from_server, followed: true}
                //     }
                //     return user_from_server
                // })
            }

        case UNFOLLOW:
            return {
                ...state,
                users_from_server: updateObjectInArray(state.users_from_server, action.userId, "id", {followed: false})
                // users_from_server: state.users_from_server.map(user_from_server => {
                //     if (user_from_server.id === action.userId) {
                //         return {...user_from_server, followed: false}
                //     }
                //     return user_from_server
                // })

            }
        case SET_USERS_FROM_SERVER: {
            return {
                ...state,
                users_from_server: action.users_from_server
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }

        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress.filter(id => id !== action.userId)]
                // learn this one more time
            } as InitialStateType
        }
        default:

            return state;
    }
};
// Action Creators V
type Actions = SetUsersFromServerType | FollowSuccessType | UnfollowSuccessType | SetCurrentPageType
    | SetTotalUsersCountType | IsFetchingType | IsFollowingProgressType

type SetUsersFromServerType = {
    type: typeof SET_USERS_FROM_SERVER,
    users_from_server: Array<UserType>
}
const setUsersFromServer = (users_from_server: Array<UserType>): SetUsersFromServerType => (
    {type: SET_USERS_FROM_SERVER, users_from_server}
)

type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
}
const followSuccess = (userId: number): FollowSuccessType => (
    {type: FOLLOW, userId}
)

type UnfollowSuccessType = {
    type:  typeof UNFOLLOW,
    userId: number
}
const unfollowSuccess = (userId: number): UnfollowSuccessType => (
    {type: UNFOLLOW, userId}
)

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
const setCurrentPage = (currentPage: number): SetCurrentPageType => (
    {type: SET_CURRENT_PAGE, currentPage: currentPage}
)

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => (
    {type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount}
)

type IsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
const IsFetching = (isFetching: boolean): IsFetchingType => (
    {type: TOGGLE_IS_FETCHING, isFetching}
)

type IsFollowingProgressType = {
    type: typeof IS_FOLLOWING_PROGRESS,
    followingInProgress: boolean,
    userId: number
}
export const isFollowingProgress = (followingInProgress: boolean, userId: number): IsFollowingProgressType => (
    {type: IS_FOLLOWING_PROGRESS, followingInProgress, userId}
)

export type MyDispatch = Dispatch<Actions>
export type Thunk = ThunkAction <Promise<void>, AppStateType, unknown, Actions>

export const getUsers = (currentPage: number, pageSize: number): Thunk => {
    return async (dispatch: MyDispatch, getState: getStateType) => {
        dispatch(IsFetching(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(IsFetching(false));
        dispatch(setUsersFromServer(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(currentPage));
    }
}

const _followUnfollowFlow = async (dispatch: MyDispatch, userId: number, apiMethod: any, actionCreator: (userId: number) => UnfollowSuccessType | FollowSuccessType) => {
    // old func without refactoring
    // return async (dispatch) => {
    //     dispatch(isFollowingProgress(true, userId))
    //     let data = await usersAPI.getfollow(userId)
    //     if (data.resultCode === 0) {
    //         dispatch(followSuccess(userId))
    //     }
    //     dispatch(isFollowingProgress(false, userId))
    // }
    dispatch(isFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(isFollowingProgress(false, userId))
}

export const follow = (userId: number): Thunk => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.getfollow.bind(usersAPI), followSuccess)
    }
}

export const unfollow = (userId: number): Thunk => {
    return async (dispatch) => {
      await _followUnfollowFlow(dispatch, userId, usersAPI.getUnfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;