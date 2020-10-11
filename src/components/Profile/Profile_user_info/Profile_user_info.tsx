import React, {ChangeEvent, FC, useState} from "react";
import s from "./Profile_user_info.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultAvatar from "../../../default_files/images/user_default_avatar.jpg";
import ProfileDataFormRedux from "./ProfileDataForm";
import {ProfileType} from "../../../Redux/Types/types";

type Profile_user_info = {
    profile: ProfileType
    saveNewPhoto: (formData: any) => void
    saveProfileData: (formData: any) => Promise<void>
    isOwner: boolean
    userStatus: string
    updateUserStatus: (status: string) => void
}

const ProfileUserInfo: FC<Profile_user_info> = (props) => {
    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const uploadNewPhoto = (e: ChangeEvent<any>) => {
        if (e.target.files.length) {
            props.saveNewPhoto(e.target.files[0])
        }
    }

    const submitProfileForm = (formData: any) => {
        props.saveProfileData(formData).then(() => {
            setEditMode(false)
            }
        )
    }


    return (
        <React.Fragment>
            <img src={props.profile.photos.large || defaultAvatar} alt="avatar"/>
            {props.isOwner && <input type="file" onChange={uploadNewPhoto}/>}
            {editMode
                ? <ProfileDataFormRedux initialValues={props.profile}
                    // @ts-ignore
                                        profile={props.profile}
                                        onSubmit={submitProfileForm}/>
                : <ProfileData profile={props.profile}
                             isOwner={props.isOwner}
                             activateEditMode={() => setEditMode(true)}
                />}
            {/*<ProfileStatus userStatus={this.props.userStatus} updateUserStatus={this.props.updateUserStatus}/>*/}
            <ProfileStatusWithHooks userStatus={props.userStatus}
                                    updateUserStatus={props.updateUserStatus}/>
        </React.Fragment>
    );
}

type ProfileData = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}
const ProfileData = ({profile, isOwner, activateEditMode}: ProfileData) => {
    return <div className={s.info}>
        {isOwner && <div><button onClick={activateEditMode}>Edit profile</button></div>}
        <div>
            <b>Full name: </b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
        </div>
        <div>
            <b>My professional skills: </b> {profile.lookingForAJobDescription}
        </div>
        <div>
            <b>About me: </b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts </b> {Object.keys(profile.contacts).map(key => {
            // @ts-ignore
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}
const Contacts = ({contactTitle, contactValue}: any) => {
    return <div>
        <b>{contactTitle}: </b> {contactValue}
    </div>
}

export default ProfileUserInfo;