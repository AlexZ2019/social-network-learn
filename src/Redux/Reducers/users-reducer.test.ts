import usersReducer, {actions, follow, InitialStateType, unfollow} from "./users-reducer";
import {usersAPI} from "../../API/users-api";
import {APIResponseType, ResultCodesEnum} from "../../API/api";

jest.mock("../../API/users-api")

const usersApiMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}
const dispatchMock = jest.fn()
const getStateMock = jest.fn()
usersApiMock.getfollow.mockReturnValue(Promise.resolve(result))
usersApiMock.getUnfollow.mockReturnValue(Promise.resolve(result))

let state: InitialStateType

// initialize a default state for each test before it starts (reinitialization of state for each test)
beforeEach(() => {
    state = {
        users_from_server: [
            {id: 0, name: "user 1", followed: false, photos: {small: null, large: null}, status: ""},
            {id: 1, name: "user 2", followed: false, photos: {small: null, large: null}, status: ""},
            {id: 2, name: "user 3", followed: true, photos: {small: null, large: null}, status: ""},
            {id: 3, name: "user 4", followed: true, photos: {small: null, large: null}, status: ""}
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    };
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersApiMock.getfollow.mockClear()
    usersApiMock.getUnfollow.mockClear()
})

test("follow success", () => {

    // call User-reducer and check if it works
    let newState = usersReducer(state, actions.followSuccess(1))
    // expect
    expect(newState.users_from_server[0].followed).toBeFalsy()
    expect(newState.users_from_server[1].followed).toBeTruthy()
})

test("unfollow success", () => {

    // call User-reducer and check if it works
    let newState = usersReducer(state, actions.unfollowSuccess(2))
    // expect
    expect(newState.users_from_server[1].followed).toBeFalsy()
    expect(newState.users_from_server[2].followed).toBeFalsy()
})

// thunk test

test("success follow thunk ", async () => {
    // call thunk
    const thunk = follow(1)
    const dispatchMock = jest.fn()
    const getStateMock = jest.fn()

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.isFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.isFollowingProgress(false, 1))
})

test("success unfollow thunk ", async () => {
    // call thunk
    const thunk = unfollow(1)

    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.isFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.isFollowingProgress(false, 1))
})