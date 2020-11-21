//import {createSelector} from "reselect";

import {AppStateType} from "../redux-store";

export const getProfileFromState = (state: AppStateType) => {
    return state.profile.profile
}

export const getUserStatusFromState = (state: AppStateType) => {
    return state.profile.userStatus
}
