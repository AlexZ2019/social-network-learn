import React from "react";
import {connect} from "react-redux";
import {
    FilterType,
    follow, getUsers, unfollow
} from "../../Redux/Reducers/users-reducer";  // Action Creators
import Users from "./Users";
import Preloader from "../common/Preloader";
import {compose} from "redux";
import {
    currentPage,
    followingInProgress, getUsersFilter,
    isFetching,
    pageSize,
    totalUsersCount,
    usersFromState,
    // usersFromStateSuperSelector
} from "../../Redux/selectors/users-selector";
import {UserType} from "../../Redux/Types/types";
import {AppStateType} from "../../Redux/redux-store";


type MapStatePropsType = {
    users_from_server: Array<UserType>;
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: Array<number>;
    filter: FilterType
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, PageSize: number, filter: FilterType) => void;
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    // getSearchingUsers: (currentPage: number, PageSize: number, find: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class UsersAPI extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);
        // this.props.IsFetching(true)
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //     this.props.IsFetching(false);
        //     this.props.setUsersFromServer(data.items);
        //     this.props.setTotalUsersCount(data.totalCount)
        // })
        // this.props.setUsers_from_server([
        // {
        //     id: 1,
        //     photoUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/aaffc3ce-5a3f-4132-bc16-443a20b88fad/d6u8658-ab25d278-831c-48e0-93f7-fad9a7a0582e.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2FhZmZjM2NlLTVhM2YtNDEzMi1iYzE2LTQ0M2EyMGI4OGZhZFwvZDZ1ODY1OC1hYjI1ZDI3OC04MzFjLTQ4ZTAtOTNmNy1mYWQ5YTdhMDU4MmUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.8ELf-buwgplhwKNksBmOw3NtWi01a6gDQBz1WYZt5fM',
        //     fullName: 'Dovakiin',
        //     status: 'fus ro dah',
        //     location: {country: 'Skyrim', city: 'Solitude'},
        //     followed: false
        // },
        // {
        //     id: 2,
        //     photoUrl: 'https://scontent.fiev25-1.fna.fbcdn.net/v/t31.0-8/11807581_725288450908649_5495255156150976648_o.jpg?_nc_cat=105&_nc_sid=09cbfe&_nc_ohc=L7939DUPdx4AX8j_8qZ&_nc_ht=scontent.fiev25-1.fna&oh=1da1a64da01b9513b3590792f1b6d884&oe=5EC57BBD',
        //     fullName: 'Ashurec',
        //     status: 'I am a developer of this social network',
        //     location: {country: 'Ukraine', city: 'Vinnitsa'},
        //     followed: true
        // },
        // {
        //     id: 3,
        //     photoUrl: 'https://wallpapercave.com/wp/jWp5xRs.jpg',
        //     fullName: 'Miraak',
        //     status: 'Fuck you, I am a true dovakiin',
        //     location: {country: 'Morrovind', city: 'Soltame'},
        //     followed: false
        // }
        //         ]
        //     )
    }

    onPageChanged = (page: number) => {
        this.props.getUsers(page, this.props.pageSize, this.props.filter)
    }
    onFilterChanged = (filter: FilterType) => {
        this.props.getUsers(1, this.props.pageSize, filter)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   users={this.props.users_from_server}
                   currentPage={this.props.currentPage}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   onPageChanged={this.onPageChanged}
                   followingInProgress={this.props.followingInProgress}
                   onFilterChanged={this.onFilterChanged}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        // users_from_server: state.users.users_from_server,
        // pageSize: state.users.pageSize,
        // totalUsersCount: state.users.totalUsersCount,
        // currentPage: state.users.currentPage,
        // isFetching: state.users.isFetching,
        // followingInProgress: state.users.followingInProgress

        users_from_server: usersFromState(state),// usersFromStateSuperSelector,
        pageSize: pageSize(state),
        totalUsersCount: totalUsersCount(state),
        currentPage: currentPage(state),
        isFetching: isFetching(state),
        followingInProgress: followingInProgress(state),
        filter: getUsersFilter(state)
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers_from_server: (users_from_server) => {
//             dispatch(setUsersFromServerAC(users_from_server))
//         },
//         setCurrentPage: (page) => {
//             dispatch(currentPageAC(page))
//         },
//         setTotalUsersCount: (totalUsersCount) => {
//             dispatch(setTotalUsersCountAC(totalUsersCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(IsFetchingAC(isFetching))
//         }
//
//     }
// }

// let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPI);

// export default connect(mapStateToProps, {
//     follow: followAC,
//     unfollow: unfollowAC,
//     setUsers_from_server: setUsersFromServerAC,
//     setCurrentPage: currentPageAC,
//     setTotalUsersCount: setTotalUsersCountAC,
//     toggleIsFetching: IsFetchingAC
// })(UsersAPI);
// export default withAuthRedirect (connect(mapStateToProps, {follow, unfollow, currentPage, isFollowingProgress, getUsers})(UsersAPI));

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {follow, unfollow, getUsers}),
)(UsersAPI)