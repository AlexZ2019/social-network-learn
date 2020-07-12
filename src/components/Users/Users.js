import React from "react";
import Paginator from "../common/Paginators/Paginator";
import User from "./User";

let Users = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <React.Fragment>
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                   pageSize={pageSize} onPageChanged={onPageChanged} />
        {users.map(user => <User user={user} key={user.id} followingInProgress={props.followingInProgress}
                                 follow={props.follow} unfollow={props.unfollow} />)}
    </React.Fragment>
}

export default Users;