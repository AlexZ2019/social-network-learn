import React, {Component} from "react"
import s from './Post.module.css'

class Post extends Component{
    render () {
        return (
            <div className={s}>
                <img src="" alt=""/>
                {this.props.message}
            </div>
        )
    }
}
export default Post