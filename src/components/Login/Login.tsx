import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import {createField, Input} from "../../utilities/FormsControl/FormsControl";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../Redux/Reducers/auth-reducer";
import {Redirect} from "react-router-dom";
import s from '../../utilities/FormsControl/FormsControl.module.css'
import {AppStateType} from "../../Redux/redux-store";

type loginFormOwnProps = {
    captchaUrl: string | null
}

export type formData = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}

type FormDataKeyOf = Extract<keyof formData, string>

const LoginForm: React.FC<InjectedFormProps<formData, loginFormOwnProps> & loginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>

        {createField<FormDataKeyOf>("email", "email", [required], Input)}
        {createField<FormDataKeyOf>("password", "password", [required], Input, {type: "password"})}
        {createField<FormDataKeyOf>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me" )}
        {/*<Field name={"email"} placeholder={"email"} component={Input} validate={[required]}/>*/}

        {/*<div>*/}
        {/*    <Field name={"password"} placeholder={"password"} type={`password`} component={Input}*/}
        {/*           validate={[required]}/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <Field name={"rememberMe"} type="checkbox" component={Input}/> remember me*/}
        {/*</div>*/}
        {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
        {captchaUrl && createField<FormDataKeyOf>("symbols", "captcha", [required], Input)}
        {error && <div className={s.form_summary_error}>
            {error}
        </div>}
        <div>
            <button>
                login
            </button>
        </div>
    </form>
}
const LoginReduxForm = reduxForm<formData, loginFormOwnProps>({
    form: 'login'
})(LoginForm)

type mapStateToProps = {
    isAuth: boolean
    captchaUrl: string | null
}
type mapDispatchToProps = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}


const Login: React.FC<mapStateToProps & mapDispatchToProps> = (props) => {

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    const onSubmit = (formData: formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return <div>
        <h1>
            Login
        </h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login, logout})(Login)