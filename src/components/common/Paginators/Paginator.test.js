import React from 'react'
import {create} from 'react-test-renderer'
import Paginator from "./Paginator";

describe ('paginator component test', () => {
    test("Pages count is 11 but must be 10", () => {
        const component = create (<Paginator totalItemsCount={11} portion={10} pageSize={1} />)
        const root = component.root
        let spans = root.findAllByType('span')
        expect(spans.length).toBe(10)
    })
    test("Button Next should be present" , () => {
        const component = create (<Paginator totalItemsCount={11} portion={10} pageSize={1} />)
        const root = component.root
        let button = root.findAllByType('button')
        expect(button.length).toBe(1)
    })
})