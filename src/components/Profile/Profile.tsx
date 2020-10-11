import React, {Component} from "react";
import ProfileUserInfo from "./Profile_user_info/Profile_user_info";
import {ProfileType} from "../../Redux/Types/types";
import PostsContainer from "./Posts/PostsContainer";

type PropsType = {
    profile: ProfileType
    isOwner: boolean
    userStatus: string
    match: any
    saveNewPhoto:(file: any) => void
    updateUserStatus: (status: string) => void
    saveProfileData: any
}

class Profile extends Component <PropsType> {

    render() {
        // if (!this.props.profile) {
        //     return <Preloader/>
        // }

        return (
            <React.Fragment>
                <ProfileUserInfo profile={this.props.profile}
                                 userStatus={this.props.userStatus}
                                 updateUserStatus={this.props.updateUserStatus}
                                 saveNewPhoto={this.props.saveNewPhoto}
                                 isOwner={!this.props.match.params.userId}
                                 saveProfileData={this.props.saveProfileData}
                />
                <PostsContainer/>
            </React.Fragment>
        );
    }
}
export default Profile;