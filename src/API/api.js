import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "a2b41d7e-e497-49f0-9283-a973ebd9da7e"
    }
})
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    getUnfollow(userId) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data
        })
    },
    getfollow(userId) {
        return instance.post(`follow/${userId}`).then(response => {
            return response.data
        })
    }
}

export const AuthAPI = {
    getAuthStatus() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')
    }
}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    getUserStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateUserStatus(status) {
        return instance.put("profile/status", {status})
    },
    savePhoto(photoFile) {
        let formData = new FormData()
        formData.append("image", photoFile)
        return instance.put("profile/photo", formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        )
    },
    saveProfile(profileData) {
        return instance.put("profile", profileData)
    }
}

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get("security/get-captcha-url")
    }
}