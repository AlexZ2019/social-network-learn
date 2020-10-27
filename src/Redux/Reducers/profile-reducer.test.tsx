import profileReducer, {actions} from "./profile-reducer";
import React from "react";
import {ProfileType} from "../Types/types";

let state = {
    posts_from_server: [
        // {post: 'message 1'},
        // {post: 'message 2'},
        // {post: 'message 3'},
        // {post: 'message 4'},
        // {post: 'message 5'},
        // {post: 'message 6'},
        // {post: 'message 7'},
        // {post: 'message 8'},
        // {post: 'message 9'},
        {id: 1, post: 'message 1'},
        {id: 2,post: 'message 2'},
        {id: 3,post: 'message 3'},
        {id: 4,post: 'message 4'},
        {id: 5,post: 'message 5'},
        {id: 6,post: 'message 6'},
        {id: 7,post: 'message 7'},
        {id: 8,post: 'message 8'},
        {id: 9,post: 'message 9'},
    ],
    newPostText: '',
    profile: null as ProfileType | null,
    userStatus: ''
};

test ('message of new post should be corrected', () => {
    // test data
    let action = actions.addPostActionCreator("Test_post")
    // action
    let newState = profileReducer(state, action)
    // expectation
    expect(newState.posts_from_server[9].post).toBe("Test_post")

});

test ('deleting posts', () => {
    // test data
    let action = actions.deletePost(1)
    // action
    let newState = profileReducer(state, action)
    // expectation
    expect(newState.posts_from_server.length).toBe(8)
});

test ('not delete post id if accepted id by a reducer is absent in posts', () => {
    // test data
    let action = actions.deletePost(1000)
    // action
    let newState = profileReducer(state, action)
    // expectation
    expect(newState.posts_from_server.length).toBe(9)
});