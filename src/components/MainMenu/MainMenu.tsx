import React, { Component } from 'react';
import s from './Menu.module.css'
import {NavLink} from "react-router-dom";

class MainMenu extends Component {

    render () {
        return (
            <div className={s.menu}>
                <div className={s.link_menu}><NavLink to="/profile" activeClassName={s.active_link}>Profile</NavLink></div>
                <div className={s.link_menu}><NavLink to="/news">News</NavLink></div>
                <div className={s.link_menu}><NavLink to ="/dialogs" activeClassName={s.active_link}>Messages</NavLink></div>
                <div className={s.link_menu}><NavLink to ="/friends" activeClassName={s.active_link}>Friends</NavLink></div>
                <div className={s.link_menu}><NavLink to ="/users" activeClassName={s.active_link}>Users</NavLink></div>
                <div className={s.link_menu}><NavLink to ="/settings">Settings</NavLink></div>
            </div>
        )
    };
}
export default MainMenu;

