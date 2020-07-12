import {AuthAPI} from "../../API/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};
// Action Creators V
export const setAuthUserData = (userId, email, login, isAuth) => (
    {type: SET_AUTH_USER_DATA, payload: {userId, email, login, isAuth}}
)

export const getAuth = () => async (dispatch) => {
    let response = await AuthAPI.getAuthStatus()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const login = (email, password, rememberMe) => {
    return async (dispatch) => {
        let response = await AuthAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            // console.log(response.data)
            dispatch(getAuth())
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit("login", {_error: message}))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        let response = await AuthAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

export default authReducer;