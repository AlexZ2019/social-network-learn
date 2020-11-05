import React, {Component, ComponentType} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfile,
    getUserStatus,
    saveNewPhoto,
    saveProfileData,
    updateUserStatus
} from "../../Redux/Reducers/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../Redux/Types/types";
import {AppStateType} from "../../Redux/redux-store";

export type PropsProfileComponentsType = {
    match: any
    authorizedUserId: number
    history: any
    getProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    profile: ProfileType
    isOwner: boolean
    userStatus: string
    updateUserStatus: (status: string) => void
    saveNewPhoto:(file: any) => void
    saveProfileData: any
}

class ProfileContainer extends Component <PropsProfileComponentsType> {

    renewalProfile () {
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

    componentDidMount() {
        this.renewalProfile()
    }

    componentDidUpdate(prevProps: PropsProfileComponentsType, prevState: AppStateType) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.renewalProfile()
        }

    }

    render() {
        return (
            <Profile {...this.props}
                     profile={this.props.profile}
                     userStatus={this.props.userStatus}
                     updateUserStatus={this.props.updateUserStatus}
                     saveNewPhoto={this.props.saveNewPhoto}
                     isOwner={!this.props.match.params.userId}
                     saveProfileData={this.props.saveProfileData}
            />
        );
    }
}
let mapStateToProps = (state: AppStateType) => ({
    profile: state.profile.profile,
    userStatus: state.profile.userStatus,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})


// let withUrlDataNewContainerComponent = withRouter (authRedirect) //return new component with router

export default compose<ComponentType>(
    connect(mapStateToProps, {getProfile, getUserStatus, updateUserStatus, saveNewPhoto, saveProfileData}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);