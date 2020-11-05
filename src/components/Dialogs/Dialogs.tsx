import React, {FC} from "react";
import s from './Dialogs.module.css';
import User from "./User/User";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, InjectedFormProps, reduxForm, WrappedReduxFormContext} from "redux-form";
import {createField, Textarea} from "../../utilities/FormsControl/FormsControl";
import {maxLengthCreator, required} from "../../utilities/validators/validators";
import {MessageType, UserDialogsType} from "../../Redux/Types/types";

type PropsType = {
    users: Array<UserDialogsType>
    messages: Array<MessageType>
    isAuth: boolean
    onClickMessage: (values: string) => void
}

const Dialogs: FC<PropsType> = (props) => {

    // onChangeMessage = (event) => {
    //     let newMessageBody = event.target.value;
    //     this.props.onChangeMessageBody(newMessageBody)
    //     console.log(this.props)
    // };
    // onClickMessage = () => {
    //     this.props.onClickMessage()
    // };

    let addNewMessage = (values: NewMessageFormValuesType): void => {
        props.onClickMessage(values.newMessageBody)
    }
    let users = props.users.map(user => <User name={user.name} id={user.id}/>);
    let messages = props.messages.map(message => <Message message={message.message}/>);
    if (!props.isAuth) {
        return (<Redirect to={'/login'}/>)
    }
    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.users}>
                    {users}
                </div>
                <div className={s.messages}>
                    {messages}
                </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}
const maxLength100 = maxLengthCreator(100)

type NewMessageFormValuesType = {
    newMessageBody: string
}
type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormValuesType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength100], Textarea)}
                {/*<Field placeholder="Enter your message" name="newMessageBody" component={Textarea} validate={[required, maxLength100]} />*/}
                <button>Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, {}>({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;