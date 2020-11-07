
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../../utilities/FormsControl/FormsControl";
import s from '../../../utilities/FormsControl/FormsControl.module.css'
import {ProfileType} from "../../../Redux/Types/types";

type PropsType = {
    profile: ProfileType
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, error}, profile: ProfileType) => {
    return <form className={s.info} onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        {error &&
        <div className={s.form_summary_error}>
            {error}
        </div>}
        <div>
            <b>Full name: </b> {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job: </b> {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skills: </b> {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me: </b> {createField("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts </b> {Object.keys(profile.contacts).map(key => {
            {/* todo: finish it up and finish typing of this createField func*/}
            return <div key={key}><b>{key}: </b> {createField(key, "contacts." + key, [], Input)}</div>
        })}
        </div>
    </form>
}

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({
    form: "profileDataForm"
})(ProfileDataForm)

export default ProfileDataFormRedux