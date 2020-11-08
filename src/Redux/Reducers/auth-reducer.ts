import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../../API/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "../redux-store";
import {AuthAPI} from "../../API/auth-api";
import {SecurityAPI} from "../../API/security-api";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null as string | null  // if null then captcha is not required
};

export type InitialStateType = typeof initialState
const authReducer = (state = initialState, action: Actions) : InitialStateType => {
    switch (action.type) {
        case "SET_AUTH_USER_DATA":
        case "GET_CAPTCHA_URL_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};
// Action Creators V

type Actions = InferActionsTypes<typeof Actions>
const Actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => (
        {
            type: "SET_AUTH_USER_DATA",
            payload: {userId, email, login, isAuth}
        } as const
    ),
    getCaptchaUrlSuccess: (captchaUrl: string) => {
        return {
            type: "GET_CAPTCHA_URL_SUCCESS",
            payload: {captchaUrl}
        } as const
    }
}
// type SetAuthUserDataType = {
//     type: typeof SET_AUTH_USER_DATA,
//     payload: {
//         userId: number | null
//         email: string | null
//         login: string | null
//         isAuth: boolean | null
//     }
// }

// type getCaptchaUrlSuccessType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS
//     payload: {captchaUrl: string}
// }

// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, Actions>
type ThunkType = BaseThunkType<Actions | FormAction>
export const getAuth = (): ThunkType => async (dispatch) => {

    let data = await AuthAPI.getAuthStatus()
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, email, login}: any = data.data; // TEMPORARY
        dispatch(Actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.login(email, password, rememberMe, captcha)
        if (data.resultCode === ResultCodesEnum.Success) {
            // console.log(response.data)
            await dispatch(getAuth())
        } else {
            if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                await dispatch(getCaptcha())
            }
            else {
                let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                dispatch(stopSubmit("login", {_error: message}))
            }
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let response = await AuthAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(Actions.setAuthUserData(null, null, null, false))
        }
    }
}

const getCaptcha = (): ThunkType => async (dispatch) => {
    const data = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(Actions.getCaptchaUrlSuccess(captchaUrl));
}

export default authReducer;