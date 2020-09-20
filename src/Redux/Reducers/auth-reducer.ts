import {AuthAPI, SecurityAPI} from "../../API/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "../redux-store";

const SET_AUTH_USER_DATA = 'auth-reducer/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = "auth-reducer/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null  // if null then captcha is not required
};

export type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: any) : InitialStateType => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};
// Action Creators V
type Actions = SetAuthUserDataType | getCaptchaUrlSuccessType
type SetAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA,
    payload: {
        userId: number | null
        email: string | null
        login: string | null
        isAuth: boolean | null
    }
}
const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType => (
    {
        type: SET_AUTH_USER_DATA,
        payload: {userId, email, login, isAuth}
    }
)

type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
const getCaptchaUrlSuccess = (captchaUrl: string) : getCaptchaUrlSuccessType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    }
}

export const getAuth = (): ThunkAction<Promise<void>, AppStateType, unknown, SetAuthUserDataType> => async (dispatch) => {
    let response = await AuthAPI.getAuthStatus()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        let response = await AuthAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            // console.log(response.data)
            dispatch(getAuth())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptcha())
            }
            else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                dispatch(stopSubmit("login", {_error: message}))
            }
        }
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await AuthAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
    }
}

const getCaptcha = (): ThunkAction<Promise<void>, AppStateType, unknown, getCaptchaUrlSuccessType> => async (dispatch) => {
    const response = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;