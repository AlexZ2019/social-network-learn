import React from "react"
import s from './Post.module.css'

type PropType = {
    message: string
}

const Post = (props: PropType) => {
    return <div className={s}>
            <img src="" alt=""/>
            {props.message}
        </div>
}

export default Post