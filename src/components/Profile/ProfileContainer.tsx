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
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType} from "../../Redux/Types/types";

// export type PropsProfileComponentsType = {
//     match: any
//     authorizedUserId: number
//     history: any
//     getProfile: (userId: number) => void
//     getUserStatus: (userId: number) => void
//     profile: ProfileType
//     isOwner: boolean
//     userStatus: string
//     updateUserStatus: (status: string) => void
//     saveNewPhoto:(file: any) => void
//     saveProfileData: any
// }

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getProfile: (userId: number | null) => void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: (status: string) => void
    saveNewPhoto:(file: File) => void
    saveProfileData: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}
export type PropsType = MapPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends Component<PropsType> {

    renewalProfile () {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        if (!userId) {
            console.error("Id must be exist in URI params or state ('authorized userId')")
        }

            this.props.getProfile(userId)
            this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.renewalProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        debugger
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