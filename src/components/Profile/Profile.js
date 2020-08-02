import React, {Component} from "react";
import Profile_user_info from "./Profile_user_info/Profile_user_info";
import PostsContainer from "./Posts/PostsContainer";

class Profile extends Component {

    render() {
        // if (!this.props.profile) {
        //     return <Preloader/>
        // }
        return (
            <React.Fragment>
                <Profile_user_info profile={this.props.profile}
                                   userStatus={this.props.userStatus}
                                   updateUserStatus={this.props.updateUserStatus}
                                   saveNewPhoto={this.props.saveNewPhoto}
                                   isOwner={!this.props.match.params.userId}
                                   saveProfileData={this.props.saveProfileData}
                />
                <PostsContainer store={this.props.store}/>
            </React.Fragment>
        );
    }
}
export default Profile;