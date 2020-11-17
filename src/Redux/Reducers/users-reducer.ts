import {updateObjectInArray} from "../../utilities/object-helpers";
import {UserType} from "../Types/types";
import {Dispatch} from "redux";
import {InferActionsTypes, BaseThunkType} from "../redux-store";
import {usersAPI} from "../../API/users-api";
import {APIResponseType} from "../../API/api";

let initialState = {
    users_from_server: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // Array of userIds
    filter: {
        term: "",
        friend: null as null | boolean
    }
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter
const usersReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case "FOLLOW":
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

        case "UNFOLLOW":
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
        case "SET_USERS_FROM_SERVER": {
            return {
                ...state,
                users_from_server: action.users_from_server
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state,
                currentPage: action.currentPage
            }

        }
        case "SET_FILTER": {
            return {
                ...state,
                filter: action.payload
            }

        }
        case "SET_TOTAL_USERS_COUNT": {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case "TOGGLE_IS_FETCHING": {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case "IS_FOLLOWING_PROGRESS": {
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
type Actions = InferActionsTypes<typeof actions>
export const actions = {
    setUsersFromServer: (users_from_server: Array<UserType>) => (
        {type: "SET_USERS_FROM_SERVER", users_from_server} as const
    ),
    followSuccess: (userId: number) => (
        {type: "FOLLOW", userId} as const
    ),
    unfollowSuccess: (userId: number) => (
        {type: "UNFOLLOW", userId} as const
    ),
    setCurrentPage: (currentPage: number) => (
        {type: "SET_CURRENT_PAGE", currentPage: currentPage} as const
    ),
    setFilterForSearch: (filter: FilterType) => (
        {type: "SET_FILTER", payload: filter} as const
    ),
    setTotalUsersCount: (totalUsersCount: number) => (
        {type: "SET_TOTAL_USERS_COUNT", totalUsersCount: totalUsersCount} as const
    ),
    IsFetching: (isFetching: boolean) => (
        {type: "TOGGLE_IS_FETCHING", isFetching} as const
    ),
    isFollowingProgress: (followingInProgress: boolean, userId: number) => (
        {type: "IS_FOLLOWING_PROGRESS", followingInProgress, userId} as const
    )
}

// export type Thunk = ThunkAction<Promise<void>, AppStateType, unknown, Actions>
type Thunk = BaseThunkType<Actions>

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): Thunk => {
    return async (dispatch) => {
        dispatch(actions.IsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setFilterForSearch(filter));
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(actions.IsFetching(false));
        dispatch(actions.setUsersFromServer(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}
// export const getSearchingUsers = (currentPage: number, pageSize: number, find: string): Thunk => {
//     return async (dispatch) => {
//         dispatch(actions.IsFetching(true));
//         let data = await usersAPI.searchUsers(currentPage, pageSize, find)
//         dispatch(actions.IsFetching(false));
//         dispatch(actions.setUsersFromServer(data.items));
//         dispatch(actions.setTotalUsersCount(data.totalCount));
//         dispatch(actions.setCurrentPage(currentPage));
//     }
// }
const _followUnfollowFlow = async (dispatch: Dispatch<Actions>, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => Actions) => {
    // old func without refactoring
    // return async (dispatch) => {
    //     dispatch(isFollowingProgress(true, userId))
    //     let data = await usersAPI.getfollow(userId)
    //     if (data.resultCode === 0) {
    //         dispatch(followSuccess(userId))
    //     }
    //     dispatch(isFollowingProgress(false, userId))
    // }
    dispatch(actions.isFollowingProgress(true, userId))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.isFollowingProgress(false, userId))
}

export const follow = (userId: number): Thunk => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.getfollow.bind(usersAPI), actions.followSuccess)
    }
}

export const unfollow = (userId: number): Thunk => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.getUnfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}

export default usersReducer;