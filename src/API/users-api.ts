import {GetItemsType, instance, APIResponseType} from "./api";

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
    searchUsers(currentPage: number = 1, pageSize: number = 10, find: string = "") {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${find}`)
            .then(response => {
                return response.data
            })
    },
    getUnfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => {
            return response.data
        }) as Promise<APIResponseType>
    },
    getfollow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => {
            return response.data
        })
    }
}