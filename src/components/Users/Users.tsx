import React from "react";
import Paginator from "../common/Paginators/Paginator";
import User from "./User";
import {UserType} from "../../Redux/Types/types";
import Search from "../common/Search/Search";

type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (page: number) => void,
    users: Array<UserType>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void
    getSearchingUsers: (currentPage: number, pageSize: number, find: string) => void
    followingInProgress: Array<number>
}

let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <React.Fragment>
        <Search sendData={props.getSearchingUsers}/>
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                   pageSize={pageSize} onPageChanged={onPageChanged} />
        {users.map(user => <User user={user} key={user.id} followingInProgress={props.followingInProgress}
                                 follow={props.follow} unfollow={props.unfollow} />)}
    </React.Fragment>
}

export default Users;