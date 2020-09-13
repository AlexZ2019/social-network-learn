import {getAuth} from "./auth-reducer";

const  INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState: InitialStateType = {
    initialized: false
}

type InitialStateType = {
    initialized: boolean
}



export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

export const  initializedSuccess = (): InitializedSuccessType => (
    {
        type: INITIALIZED_SUCCESS
    }
    )

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuth())
    Promise.all([promise]).then ( () => {
        dispatch(initializedSuccess())
    })
}
export default appReducer