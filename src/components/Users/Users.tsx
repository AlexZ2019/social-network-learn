import React, {useEffect} from "react";
import Paginator from "../common/Paginators/Paginator";
import User from "./User";
import {UserSearchForm} from "./UsersSearchForm";
import {FilterType, getUsers} from "../../Redux/Reducers/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage, getFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsersFilter,
    getUsersFromState
} from "../../Redux/selectors/users-selector";

export let Users: React.FC = () => {
    let totalUsersCount = useSelector(getTotalUsersCount)
    let currentPage = useSelector(getCurrentPage)
    let pageSize = useSelector(getPageSize)
    let users = useSelector(getUsersFromState)
    let filter = useSelector(getUsersFilter)
    let followingInProgress = useSelector(getFollowingInProgress)

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])
    const dispatch = useDispatch()

    const onPageChanged = (page: number) => {
        dispatch(getUsers(page, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    return <React.Fragment>
        {/*<SearchWithReduxForm sendData={props.getSearchingUsers}/>*/}
        <UserSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount}
                   pageSize={pageSize} onPageChanged={onPageChanged}/>
        {users.map(user => <User user={user} key={user.id} followingInProgress={followingInProgress}
                                 follow={follow} unfollow={unfollow}/>)}
    </React.Fragment>
}
