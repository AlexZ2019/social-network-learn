import React, {FC, MemoExoticComponent} from "react"
import s from './Posts.module.css'
import Post from './Post/Post'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/validators";
import {Textarea} from "../../../utilities/FormsControl/FormsControl";
import {PostType} from "../../../Redux/Types/types";
const maxLength10 = maxLengthCreator(10)

type PropsType = {
    posts: Array<PostType>
    create_post: (values: any) => void
}
const Posts: MemoExoticComponent<FC<PropsType>> = React.memo((props: PropsType) => {

    // new_post = React.createRef();
    // onPostChange = () => {
    //     let new_post_body = this.new_post.current.value;
    //     this.props.onPostChange(new_post_body);
    //     console.log(this.props)
    // };
    let create_post = (values: any) => {
        props.create_post(values.addNewPost)
    };
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps !== this.props || nextState !== this.state
    // } or import PureComponent from React if a component is a class

        let posts = [...props.posts].reverse().map(post => <Post message={post.post}/>);
        return (
            <React.Fragment>
                <div className={s.create_post}>
                    <p>Create a post</p>
                    <AddPostFormRedux onSubmit={create_post}/>
                </div>
                <div>
                    {posts}
                </div>
            </React.Fragment>
        )
    })
const AddPostFrom = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name="addNewPost" validate={[required, maxLength10]} placeholder="Enter post's text"/>
        <button>create post</button>
    </form>
}
const AddPostFormRedux = reduxForm ({form: "addPost"})(AddPostFrom)
export default Posts