import {usersAPI} from "../../API/api";
import {updateObjectInArray} from "../../utilities/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS_FROM_SERVER = 'SET_USERS_FROM_SERVER';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const IS_FOLLOWING_PROGRESS = "IS_FOLLOWING_PROGRESS"

let initialState = {
    users_from_server: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};
const usersReducer = (state = initialState, action) => {
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
            }
        }
        default:

            return state;
    }
};
// Action Creators V
export const setUsersFromServer = (users_from_server) => (
    {type: SET_USERS_FROM_SERVER, users_from_server}
)
export const followSuccess = (userId) => (
    {type: FOLLOW, userId}
)
export const unfollowSuccess = (userId) => (
    {type: UNFOLLOW, userId}
)
export const setCurrentPage = (currentPage) => (
    {type: SET_CURRENT_PAGE, currentPage: currentPage}
)
export const setTotalUsersCount = (totalUsersCount) => (
    {type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount}
)
export const IsFetching = (isFetching) => (
    {type: TOGGLE_IS_FETCHING, isFetching}
)
export const isFollowingProgress = (followingInProgress, userId) => (
    {type: IS_FOLLOWING_PROGRESS, followingInProgress, userId}
)

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(IsFetching(true))
        let data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(IsFetching(false));
        dispatch(setUsersFromServer(data.items));
        dispatch(setTotalUsersCount(data.totalCount))
        dispatch(setCurrentPage(currentPage))
    }
}
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
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

export const follow = (userId) => {
    return async (dispatch) => {
       await followUnfollowFlow(dispatch, userId, usersAPI.getfollow.bind(usersAPI), followSuccess)
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {
      await followUnfollowFlow(dispatch, userId, usersAPI.getUnfollow.bind(usersAPI), unfollowSuccess)
    }
}

export default usersReducer;