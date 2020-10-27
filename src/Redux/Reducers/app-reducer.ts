import {getAuth} from "./auth-reducer";
import {InferActionsTypes} from "../redux-store";

let initialState = {
    initialized: false
}

// type InitialStateType = {
//     initialized: boolean
// }
type InitialStateType = typeof initialState

export const actions = {
    initializedSuccess: () => (
        {
            type: 'APP_REDUCER_INITIALIZED_SUCCESS'

        }
    )
}

type Actions = InferActionsTypes<typeof actions>
export const appReducer = (state = initialState, action: Actions): InitialStateType => {
    switch (action.type) {
        case "APP_REDUCER_INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

// type InitializedSuccessType = {
//     type: typeof INITIALIZED_SUCCESS
// }

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuth())
    Promise.all([promise]).then ( () => {
        dispatch(actions.initializedSuccess())
    })
}
export default appReducer;