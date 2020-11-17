import React from "react";
import {reduxForm, InjectedFormProps} from "redux-form";
import {createField} from "../../../utilities/FormsControl/FormsControl";

type PropsType = {
    sendData: (currentPage: number, PageSize: number, find: string) => void
}

type FormData = {
    search: string
}
type FormDataKeyOf = Extract<keyof FormData, string>

const SearchForm: React.FC<InjectedFormProps<FormData>> = ({handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        {createField<FormDataKeyOf>("Search", "search", [], "input")}
        <button>Search</button>
    </form>
}

const SearchFormRedux = reduxForm<FormData>({
    form: "search"
})(SearchForm)

const SearchWithReduxForm: React.FC<PropsType> = (props) => {

    const searchUsers = (formData: FormData) => {
        if (formData.search.length >= 3) { // TODO: refactor if
            props.sendData(1, 10, formData.search)
        }
    }

    return <SearchFormRedux onSubmit={searchUsers}/>
}


export default SearchWithReduxForm