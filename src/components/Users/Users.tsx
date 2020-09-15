import React from "react";
import Paginator from "../common/Paginators/Paginator";
import User from "./User";
import {UserType} from "../../Redux/Types/types";

type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: any,
    users: Array<UserType>,
    follow: any,
    unfollow: any,
    followingInProgress: Array<number>
}

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}: PropsType) => {
    return <React.Fragment>
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                   pageSize={pageSize} onPageChanged={onPageChanged} />
        {users.map(user => <User user={user} key={user.id} followingInProgress={props.followingInProgress}
                                 follow={props.follow} unfollow={props.unfollow} />)}
    </React.Fragment>
}

export default Users;