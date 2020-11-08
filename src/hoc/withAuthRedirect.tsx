import React, {ComponentType} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../Redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type Props = ReturnType<typeof mapStateToPropsForRedirect>

export function withAuthRedirect <WCP>(WrappedComponent: ComponentType<WCP>) {
    const RedirectComponent: React.FC<Props> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='/login'/>
        return <WrappedComponent {...restProps as WCP}/>
    }

    return connect<Props, unknown, WCP, AppStateType>(mapStateToPropsForRedirect)(RedirectComponent)
}

// export const withAuthRedirect = (WrappedComponent) => {
//     class RedirectComponent extends React.Component {
//         render() {
//             if (!this.props.isAuth) return <Redirect to='/login' />
//             return <WrappedComponent {...this.props}/>
//         }
//     }
//     let ConnectedAuthRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent)
//     return ConnectedAuthRedirect
// }