import React, {Component} from "react";
import s from './User.module.css';
import {NavLink} from "react-router-dom";

class User extends Component {

    path = '/dialogs/' + this.props.id;

    render() {
        return (
            <div className={s.user}>
                <NavLink to={this.path}>{this.props.name}</NavLink>
            </div>
        );
    }
}


export default User;