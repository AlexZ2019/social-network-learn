import React, {Component} from "react";
import s from "./Profile_user_info.module.css";
import Preloader from "../../common/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

class Profile_user_info extends Component{

    render () {
        if (!this.props.profile) {
            return <Preloader/>
        }
        return (
            <React.Fragment>
                <img src={this.props.profile.photos.large} alt="avatar"/>
                <div className={s.info}>
                    name:
                    age:
                </div>
                {/*<ProfileStatus userStatus={this.props.userStatus} updateUserStatus={this.props.updateUserStatus}/>*/}
                <ProfileStatusWithHooks userStatus={this.props.userStatus} updateUserStatus={this.props.updateUserStatus}/>
            </React.Fragment>
        );
    }
}
export default Profile_user_info;