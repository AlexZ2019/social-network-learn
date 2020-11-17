//import {createSelector} from "reselect";

import {AppStateType} from "../redux-store";

export const getUsersFromState = (state: AppStateType) => {
    return state.users.users_from_server
}
// export const usersFromStateSelector = (state) => {
//     return usersFromState(state).filter(u => true)
// }
// export const usersFromStateSuperSelector = createSelector(usersFromState, (users) => {
//     return users.filter(u => true)
// })
export const getTotalUsersCount = (state: AppStateType) => {
    return state.users.totalUsersCount
}
export const getPageSize = (state: AppStateType) => {
    return state.users.pageSize
}
export const getCurrentPage = (state: AppStateType) => {
    return state.users.currentPage
}
export const getIsFetching = (state: AppStateType) => {
    return state.users.isFetching
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.users.followingInProgress
}
export const getUsersFilter = (state: AppStateType) => {
    return state.users.filter
}

