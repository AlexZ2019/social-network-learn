import React, {Component} from "react";

// import Preloader from "../../common/Preloader";


class ProfileStatus extends Component {
    state = {
        editMode: false,
        status: this.props.userStatus
    }
    activateMode = () => {
        this.setState(
            {
                editMode: true
            }
        )
    }

    deactivateMode = () => {
        this.setState(
            {
                editMode: false
            }
        )
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userStatus !== this.props.userStatus) {
            this.setState({
                status: this.props.userStatus
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.editMode &&
                <div>
                  <span onDoubleClick={this.activateMode}>
                      {this.props.userStatus || 'status is absent'}
                  </span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateMode} value={this.state.status}/>
                </div>
                }
            </React.Fragment>
        );
    }
}

export default ProfileStatus;