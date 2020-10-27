import {PhotosType, ProfileType} from "../Redux/Types/types";
import {instance, APIResponseType} from "./api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const ProfileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data)
    },
    updateUserStatus(status: string) {
        return instance.put("profile/status", {status}).then(res => res.data)
    },
    savePhoto(photoFile: File) {
        let formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>("profile/photo", formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }
        ).then(res => res.data)
    },
    saveProfile(profileData: ProfileType) {
        return instance.put<APIResponseType>("profile", profileData)
    }
}