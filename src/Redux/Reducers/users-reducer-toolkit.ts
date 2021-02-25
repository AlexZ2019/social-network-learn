import {UserType} from "../Types/types";
import {Dispatch} from "redux";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {usersAPI} from "../../API/users-api";
import {APIResponseType} from "../../API/api";
import {createSlice} from "@reduxjs/toolkit";

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

// export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter

const usersSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUsersFromServer: (state, action) => {
            debugger
            state.users_from_server = action.payload
        },
        isFetching: (state, action) => {
            debugger
            state.isFetching = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setFilterForSearch: (state, action) => {
            state.filter = action.payload
        },
        setTotalUsersCount: (state, action) => {
            state.totalUsersCount = action.payload
        },
        isFollowingProgress: (state, action) => {
            state.followingInProgress = action.payload.followingInProgress
                ? [state.followingInProgress, action.payload.userId]
                : [state.followingInProgress.filter(id => id !== action.payload.userId)]
        },
        followSuccess: (state, action) => {
            state.users_from_server.map(u => {
                if (u.id === action.payload.userId) {
                    u.followed = true
                }

                return u
            })
        },
        unfollowSuccess: (state, action) => {
            state.users_from_server.map(u => {
                if (u.id === action.payload.userId) {
                    u.followed = false
                }

                return u
            })
        }
    }
})


// Action Creators V
type Actions = InferActionsTypes<typeof usersSlice.actions>

// export type Thunk = ThunkAction<Promise<void>, AppStateType, unknown, Actions>
type Thunk = BaseThunkType<Actions>

const {isFetching, followSuccess, isFollowingProgress, setCurrentPage, setFilterForSearch, setTotalUsersCount, setUsersFromServer, unfollowSuccess} = usersSlice.actions

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): Thunk => {
    return async (dispatch) => {
        dispatch(isFetching(true));
        dispatch(setCurrentPage(currentPage));
        dispatch(setFilterForSearch(filter));
        let data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        dispatch(isFetching(false));
        dispatch(setUsersFromServer(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: Dispatch, userId: number, apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) => Actions) => {

    dispatch(isFollowingProgress({true: true, userId}))
    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(isFollowingProgress({false: false, userId}))
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

export default usersSlice.reducer;