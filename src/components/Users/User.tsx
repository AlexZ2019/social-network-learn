import React, {FunctionComponent} from "react";
import style from "./users.module.css";
import user_default_avatar from "../../default_files/images/user_default_avatar.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../Redux/Types/types";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    follow: any,
    unfollow: any
}

let User: FunctionComponent<PropsType> = ({user, followingInProgress, follow, unfollow}): React.ReactElement => {
    return <React.Fragment>
            <div key={user.id} className={style.user_main}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                             <img src={user.photos.small != null ? user.photos.small : user_default_avatar} alt=""
                                  className={style.userPhoto}/>
                         <img src="" alt=""/>
                        </NavLink>

                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow</button>
                            : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                follow(user.id)
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>
                            {user.name}
                        </div>
                        <div>
                            {user.status}
                        </div>
                    </span>
                    <span>
                        <div>
                            {'user.location.country'}
                        </div>
                        <div>
                            {'user.location.city'}
                        </div>
                    </span>
                </span>
            </div>
    </React.Fragment>
}

export default User;