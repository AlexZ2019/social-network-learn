import React from "react"
// import s from './Post.module.css'

type PropType = {
    message: string
}

const Post: React.FC<PropType> = (props) => {
    return <div >
            <img src="" alt=""/>
            {props.message}
        </div>
}

export default Post