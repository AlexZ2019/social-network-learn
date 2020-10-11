// import React, {Component} from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose, Dispatch} from "redux";
import {AddMessageActionCreator, AddMessageActionCreatorType} from "../../Redux/Reducers/dialigs-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {MessageType, UserDialogsType} from "../../Redux/Types/types";

// class DialogsContainer extends Component {
//     state = this.props.store.getState().dialogs;
//
//     ChangeMessage = (event) => {
//         let action = newMessageBodyActionCreator(event);
//         this.props.store.dispatch(action);
//     };
//     AddMessage = () => {
//         this.props.store.dispatch(AddMessageActionCreator())
//     };
//     render() {
//         return (
//           <Dialogs onChangeMessageBody={this.ChangeMessage}
//                    onClickMessage={this.AddMessage}
//                    users={this.state.users_from_server}
//                    messages={this.state.messages_from_server}
//
//           />
//         )
//     }
// }

type MapStateType = {
    users: Array<UserDialogsType>
    messages: Array<MessageType>
    isAuth: boolean
}

type MapDispatchType = {
    onClickMessage: (ewMessageBody: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        users: state.dialogs.users_from_server,
        messages: state.dialogs.messages_from_server,
        // newMessageBodyState: state.dialogs.newMessageBodyState,
        isAuth: state.auth.isAuth
    }
};

let mapDispatchToProps = (dispatch: Dispatch<AddMessageActionCreatorType>): MapDispatchType => {
    return {
        // onChangeMessageBody: (newMessageBody) => {
        //     dispatch(newMessageBodyActionCreator(newMessageBody));
        // },
        onClickMessage: (newMessageBody: string) => {
            dispatch(AddMessageActionCreator(newMessageBody));
        }
    }
}

export default compose(
    connect<MapStateType, MapDispatchType, null, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Dialogs);