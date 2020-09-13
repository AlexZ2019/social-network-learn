// import React, {Component} from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AddMessageActionCreator} from "../../Redux/Reducers/dialigs-reducer";

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
let mapStateToProps = (state) => {
    return {
        users: state.dialogs.users_from_server,
        messages: state.dialogs.messages_from_server,
        // newMessageBodyState: state.dialogs.newMessageBodyState,
        isAuth: state.auth.isAuth
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        // onChangeMessageBody: (newMessageBody) => {
        //     dispatch(newMessageBodyActionCreator(newMessageBody));
        // },
        onClickMessage: (newMessageBody) => {
            dispatch(AddMessageActionCreator(newMessageBody));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Dialogs);