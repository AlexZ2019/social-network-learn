export type PostType = {
    id: number,
    post: string
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    foolName: string
    photos: PhotosType
    contacts: ContactsType
}

export type ContactsType = {
    gitHub: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    webSite: string
    YouTube: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
}