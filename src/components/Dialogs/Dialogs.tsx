import React, {FC} from "react";
import s from './Dialogs.module.css';
import User from "./User/User";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../utilities/FormsControl/FormsControl";
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

    let addNewMessage = (values: any) => {
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
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </div>
    )
}
const maxLength100 = maxLengthCreator(100)

type AddMessageFormPropsType = {
    handleSubmit: any
}
const AddMessageForm = (props: AddMessageFormPropsType) => {
    return (
        <form onSubmit={props.handleSubmit}>
                <Field placeholder="Enter your message" name="newMessageBody" component={Textarea} validate={[required, maxLength100]} />
                <button>Send</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;