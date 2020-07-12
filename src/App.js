import React from 'react';
import './App.css';
import Menu from "./components/Menu/Menu";
import {Route, withRouter} from "react-router-dom";
// import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
// import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import Preloader from "./components/common/Preloader";
import {initializeApp} from "./Redux/Reducers/app-reducer";
import {withSuspense} from "./hoc/withSuspense";
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (
            <div className="App">
                <HeaderContainer/>
                <Menu/>
                <Route path='/profile/:userId?'
                       render={withSuspense(ProfileContainer)}
                />
                <Route path='/dialogs'
                       render={withSuspense(DialogsContainer)}
                />
                <Route path='/users'
                       render={() =>
                           <UsersContainer/>
                       }
                />
                <Route path='/login'
                       render={() =>
                           <Login/>
                       }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
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