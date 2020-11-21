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
import { useHistory } from "react-router-dom";
import * as queryString from "querystring";

type QueryParamsType = { term?: string, friend?: string, page?: string };
export let Users: React.FC = () => {
    let totalUsersCount = useSelector(getTotalUsersCount)
    let currentPage = useSelector(getCurrentPage)
    let pageSize = useSelector(getPageSize)
    let users = useSelector(getUsersFromState)
    let filter = useSelector(getUsersFilter)
    let followingInProgress = useSelector(getFollowingInProgress)
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        const parsedSearch = queryString.parse(history.location.search.substr(1)) as QueryParamsType
        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsedSearch.page) {
            actualPage = Number(parsedSearch.page)
        }
        if (!!parsedSearch.term) {
            actualFilter = {...actualFilter, term: parsedSearch.term}
        }
        switch (parsedSearch.friend){
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(getUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: QueryParamsType = {}
        if (!!filter.term) {
            query.term = filter.term
        }
        if (filter.friend !== null) {
            query.friend = String(filter.friend)
        }
        if (currentPage !== 1) {
            query.page = String(currentPage)
        }
        history.push({
            pathname: "/users",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])


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
