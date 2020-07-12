import React, {Component} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getUserStatus, updateUserStatus} from "../../Redux/Reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} userStatus={this.props.userStatus} updateUserStatus={this.props.updateUserStatus}/>
        );
    }
}
let mapStateToProps = (state) => ({
    profile: state.profile.profile,
    userStatus: state.profile.userStatus,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})


// let withUrlDataNewContainerComponent = withRouter (authRedirect) //return new component with router

export default compose(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);