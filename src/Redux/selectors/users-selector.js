//import {createSelector} from "reselect";

export const usersFromState = (state) => {
    return state.users.users_from_server
}
// export const usersFromStateSelector = (state) => {
//     return usersFromState(state).filter(u => true)
// }
// export const usersFromStateSuperSelector = createSelector(usersFromState, (users) => {
//     return users.filter(u => true)
// })
export const totalUsersCount = (state) => {
    return state.users.totalUsersCount
}
export const pageSize = (state) => {
    return state.users.pageSize
}
export const currentPage = (state) => {
    return state.users.currentPage
}
export const isFetching = (state) => {
    return state.users.isFetching
}
export const followingInProgress = (state) => {
    return state.users.followingInProgress
}
