import React, {ChangeEvent, Component} from "react";

// import Preloader from "../../common/Preloader";

type Props = {
    userStatus: string
    updateUserStatus: (status: string) => void
}

type State = {
    editMode: boolean
    status: string
}
class ProfileStatus extends Component<Props> {
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
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: Props, prevState: State) {
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