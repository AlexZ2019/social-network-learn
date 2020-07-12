import React from "react";
import s from './FormsControl.module.css'
import {Field} from "redux-form";


export const FormControl = ({input, meta: {touched, error}, children}) => {
    const hasError = error && touched
    return <div className={s.form_control + ' ' + (hasError ? s.error: '')}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}
export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    return <div><Field name={name} placeholder={placeholder} component={component} validate={validators} {...props} />{text}</div>
}