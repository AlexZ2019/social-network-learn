import React from "react";
import {reduxForm} from "redux-form";
import {createField, Input} from "../../utilities/FormsControl/FormsControl";
import {required} from "../../utilities/validators/validators";
import {connect} from "react-redux";
import {login, logout} from "../../Redux/Reducers/auth-reducer";
import {Redirect} from "react-router-dom";
import s from '../../utilities/FormsControl/FormsControl.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return <form onSubmit={handleSubmit}>

        {createField("email", "email", [required], Input)}
        {createField("password", "password", [required], Input, {type: "password"})}
        {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me" )}
        {/*<Field name={"email"} placeholder={"email"} component={Input} validate={[required]}/>*/}

        {/*<div>*/}
        {/*    <Field name={"password"} placeholder={"password"} type={`password`} component={Input}*/}
        {/*           validate={[required]}/>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*    <Field name={"rememberMe"} type="checkbox" component={Input}/> remember me*/}
        {/*</div>*/}
        {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
        {captchaUrl && createField("symbols", "captcha", [required], Input)}
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
const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)


const Login = (props) => {

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    return <div>
        <h1>
            Login
        </h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login, logout})(Login)