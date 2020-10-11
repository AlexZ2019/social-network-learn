import axios from "axios";
import {ProfileType} from "../Redux/Types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "a2b41d7e-e497-49f0-9283-a973ebd9da7e"
    }
})
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    getUnfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data
        })
    },
    getfollow(userId: number) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data
        })
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type GetAuthStatusResponseType = {
    data: {
        id: number
        email: string
        login: string
    },
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    },
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
type GetCaptchaType = {
    url: string
}
export const AuthAPI = {
    getAuthStatus() {
        return instance.get<GetAuthStatusResponseType>(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateUserStatus(status: string) {
        return instance.put("profile/status", {status})
    },
    savePhoto(photoFile: any) {
        let formData = new FormData()
        formData.append("image", photoFile)
        return instance.put("profile/photo", formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        )
    },
    saveProfile(profileData: ProfileType) {
        return instance.put("profile", profileData)
    }
}

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaType>("security/get-captcha-url")
    }
}