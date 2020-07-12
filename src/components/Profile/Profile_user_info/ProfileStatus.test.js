import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create (<ProfileStatus userStatus={'status'}/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe("status")
    })
    test("after creation span should be displayed ", () => {
        const component = create (<ProfileStatus userStatus={'status'}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span).not.toBeNull()
    })
    test("after creation span should contain a correct status", () => {
        const component = create (<ProfileStatus userStatus={'status'}/>)
        const root = component.root
        let span = root.findByType("span")
        expect(span.children[0]).not.toBeNull()
    })
    test("after creation input shouldn't be displayed", () => {
        const component = create (<ProfileStatus userStatus={'status'}/>)
        const root = component.root
        expect(() => {
            let input = root.findByType("input")
        }).toThrow()
    })
    test("input should be displayed in EditMode instead of span", () => {
        const component = create (<ProfileStatus userStatus={'status'}/>)
        const root = component.root
        let span = root.findByType("span")
        span.props.onDoubleClick()
        let input = root.findByType("input")
        expect(input.props.value).toBe('status')
    })
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create (<ProfileStatus userStatus={'status'} updateUserStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})