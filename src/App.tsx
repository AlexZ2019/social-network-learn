import React from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import {Redirect, Route, withRouter} from "react-router-dom";
// import DialogsContaine r from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import Preloader from "./components/common/Preloader";
import {initializeApp} from "./Redux/Reducers/app-reducer";
import {withSuspense} from "./hoc/withSuspense";
// import Switch from "react-router-dom/es/Switch";
import {AppStateType} from "./Redux/redux-store";

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type Props = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);

class App extends React.Component<Props & DispatchPropsType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {

}
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillMount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="App">
                <HeaderContainer/>
                <Menu/>
                {/*<Switch>*/}
                    <Route exact path='/'
                           render={() => <Redirect to={"/profile"}/>}
                    />
                    <Route path='/profile/:userId?'
                           render={() => <SuspendedProfile/>}
                    />
                    <Route path='/dialogs'
                           render={() => <SuspendedDialogs/>}
                    />
                    <Route path='/users'
                           render={() =>
                               <UsersContainer/>
                           }
                    />
                    <Route path='/login/facebook'
                           render={() =>
                               <div>facebook</div>}
                    />
                    <Route path='/login'
                           render={() =>
                               <Login/>
                           }
                    />
                    {/*<Route path='*'*/}
                    {/*       render={() =>*/}
                    {/*           <div>404 not found</div>*/}
                    {/*       }*/}
                    {/*/>*/}
                {/*</Switch>*/}
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);

/*

<Route exact path='/profile'
                           render={() => <Profile store={this.props.store}/>}
                    />
                    <Route path='/dialogs'
                           render={() => <DialogsContainer store={this.props.store}/>
                           }
                    />
 */