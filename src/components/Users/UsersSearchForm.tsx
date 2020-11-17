import {Field, Formik, Form} from "formik";
import React from "react";
import {FilterType} from "../../Redux/Reducers/users-reducer";

const validate = (values: any) => {
    const errors = {};

    return errors;
}

type FormType = {
    term: string
    friend: "true" | "false" | "null"
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UserSearchForm: React.FC<PropsType> = React.memo((props) => {
    const onSubmit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    };
    return <div>
        <Formik
            initialValues={{term: '', friend: "null"}}
            validate={validate}
            onSubmit={onSubmit}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field type="text" name="term"/>
                    <Field name="friend" as="select">
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    </div>
})