import React, {useState} from "react";
import s from "./Profile_user_info.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import defaultAvatar from "../../../default_files/images/user_default_avatar.jpg";
import ProfileDataFormRedux from "./ProfileDataForm";

const ProfileUserInfo = (props) => {
    let [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const uploadNewPhoto = (e) => {
        if (e.target.files.length) {
            props.saveNewPhoto(e.target.files[0])
        }
    }

    const submitProfileForm = (formData) => {
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

const ProfileData = ({profile, isOwner, activateEditMode}) => {
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
            <b>About me: </b> {profile.abotMe}
        </div>
        <div>
            <b>Contacts </b> {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}
const Contacts = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}: </b> {contactValue}
    </div>
}

export default ProfileUserInfo;