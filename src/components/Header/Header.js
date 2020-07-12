import React, { Component } from "react"
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <>
            <div className={s.Header}>
                <a href="#s">Home</a>
                <a href="#s">News Feed</a>
                <a href="#s">Messages</a>
            </div>
                <div className={s.loginBlock}>
                    {this.props.isAuth
                        ? <div>{this.props.login} <button onClick={this.props.logout}>logout</button></div>
                        : <NavLink to={'/login'}>
                        Login
                    </NavLink>
                    }

                </div>
            </>
        )
    }
}
export default Header;