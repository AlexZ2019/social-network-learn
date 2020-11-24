import * as React from "react";
// import Header from "./Header";
// import {connect} from "react-redux";
// import {logout} from "../../Redux/Reducers/auth-reducer";
// import {AppStateType} from "../../Redux/redux-store";
//
//
// type MapStateType = {
//     login: string | null
//     isAuth: boolean
// }
//
// type MapDispatchType = {
//     logout: () => void
// }
//
// export type PropsType = MapStateType & MapDispatchType;
//
// class HeaderContainer extends React.Component <PropsType>{
//
//
//     render() {
//         return <Header {...this.props}/>
//     }
// }
//
// const mapStateToProps = (state: AppStateType): MapStateType => ({
//     isAuth: state.auth.isAuth,
//     login: state.auth.login
// })
// export default connect<MapStateType, MapDispatchType, unknown, AppStateType> (mapStateToProps, {logout}) (HeaderContainer);