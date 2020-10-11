
import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../../utilities/FormsControl/FormsControl";
import s from '../../../utilities/FormsControl/FormsControl.module.css'

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return <form className={s.info} onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        </div>
        {error &&
        <div className={s.form_summary_error}>
            {error}
        </div>}
        <div>
            <b>Full name: </b> {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
            <b>Looking for a job: </b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skills: </b> {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>About me: </b> {createField("About me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts </b> {Object.keys(profile.contacts).map(key => {
            return <div key={key}><b>{key}: </b> {createField(key, "contacts." + key, [], Input)}</div>
        })}
        </div>
    </form>
}

const ProfileDataFormRedux = reduxForm({
    form: "profileDataForm"
})(ProfileDataForm)

export default ProfileDataFormRedux