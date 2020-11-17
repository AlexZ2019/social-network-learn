//import {createSelector} from "reselect";

import {AppStateType} from "../redux-store";

export const usersFromState = (state: AppStateType) => {
    return state.users.users_from_server
}
// export const usersFromStateSelector = (state) => {
//     return usersFromState(state).filter(u => true)
// }
// export const usersFromStateSuperSelector = createSelector(usersFromState, (users) => {
//     return users.filter(u => true)
// })
export const totalUsersCount = (state: AppStateType) => {
    return state.users.totalUsersCount
}
export const pageSize = (state: AppStateType) => {
    return state.users.pageSize
}
export const currentPage = (state: AppStateType) => {
    return state.users.currentPage
}
export const isFetching = (state: AppStateType) => {
    return state.users.isFetching
}
export const followingInProgress = (state: AppStateType) => {
    return state.users.followingInProgress
}
export const getUsersFilter = (state: AppStateType) => {
    return state.users.filter
}
