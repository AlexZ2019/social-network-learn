import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

type GetAuthStatusResponseType = {
    data: {
        id: number | null
        email: string | null
        login: string | null
    }
}

type LoginResponseType = {
    data: {
        userId: number
    }
}


export const AuthAPI = {
    getAuthStatus() {
        return instance.get<APIResponseType<GetAuthStatusResponseType>>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<APIResponseType<LoginResponseType,ResultCodesEnum | ResultCodeForCaptchaEnum>>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login')
    }
}