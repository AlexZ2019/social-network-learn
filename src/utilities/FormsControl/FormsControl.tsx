import React from "react";
import s from './FormsControl.module.css'
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {FieldValidate} from "../validators/validators";

type FormControlType = {
    meta: WrappedFieldMetaProps
}


export const FormControl: React.FC<FormControlType> = ({meta: {touched, error}, children}) => {
    const hasError = error && touched
    return <feColorMatrix className={s.form_control + ' ' + (hasError ? s.error: '')}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </feColorMatrix>
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}


export function createField<formKeyType extends string> (placeholder: string | undefined,
                            name: formKeyType,
                            validators: Array<FieldValidate>,
                            component: React.FC<WrappedFieldProps> | string,
                            props = {},
                            text = '') {
    return <div><Field name={name}
                       placeholder={placeholder}
                       component={component}
                       validate={validators}
                       {...props} />
                       {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>