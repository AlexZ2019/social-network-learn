import React, {ChangeEvent, useEffect, useState} from "react";
// import Preloader from "../../common/Preloader";

type PropsType = {
    userStatus: string
    updateUserStatus: (userStatus: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [userStatus, setUserStatus] = useState(props.userStatus)
    useEffect(() => {
        setUserStatus(props.userStatus)

    }, [props.userStatus])
    const activateMode = () => {
        setEditMode(true)
    }
    const deactivateMode = () => {
        setEditMode(false)
        props.updateUserStatus(userStatus)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserStatus(e.currentTarget.value)
    }

    return (
        <React.Fragment>
            {!editMode &&
            <div>
                  <span onDoubleClick={activateMode}>
                    <b>Status: </b> {props.userStatus || 'status is absent'}
                  </span>
            </div>}
            {editMode &&
            <div>
                <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateMode} value={userStatus}/>
            </div>
            }
        </React.Fragment>
    );
}

export default ProfileStatusWithHooks;