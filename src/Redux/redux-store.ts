import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./Reducers/profile-reducer";
import dialogsReducer from "./Reducers/dialigs-reducer";
import menuReducer from "./Reducers/menu-reducer";
import usersReducer from "./Reducers/users-reducer";
import authReducer from "./Reducers/auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./Reducers/app-reducer";

let rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    menu: menuReducer,
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;

// type PropertiesType<T> = T extends {[key: string]: infer A} ? A : never
// export type InferActionsTypes<T extends {[key: string]: (...arg: any) => any}> = ReturnType<PropertiesType<T>>
export type InferActionsTypes<T> = T extends {[keys: string]: (...args: any[]) => infer U} ? U : never
export type AppStateType = ReturnType<RootReducerType>
export type BaseThunkType<Actions extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, Actions>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;