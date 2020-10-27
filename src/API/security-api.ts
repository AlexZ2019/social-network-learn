import {instance} from "./api";

type GetCaptchaType = {
    url: string
}
export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaType>("security/get-captcha-url").then(res => res.data)
    }
}