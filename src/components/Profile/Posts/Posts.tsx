import React from "react"
import s from './Posts.module.css'
import Post from './Post/Post'
import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utilities/validators/validators";
import {createField, GetStringKeys, Textarea} from "../../../utilities/FormsControl/FormsControl";
import {PostType} from "../../../Redux/Types/types";
const maxLength10 = maxLengthCreator(10)

type MapPropsType = {
    posts: Array<PostType>
}
type DispatchPropsType = {
    create_post: (values: string) => void
}
const Posts: React.FC<MapPropsType & DispatchPropsType> = React.memo((props) => {

    // new_post = React.createRef();
    // onPostChange = () => {
    //     let new_post_body = this.new_post.current.value;
    //     this.props.onPostChange(new_post_body);
    //     console.log(this.props)
    // };
    let create_post = (values: Add_Post_Values_Form) => {
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

type Add_Post_Values_Form = {
    addNewPost: string
}
type Add_POST_VALUES_FORM_KEYS = GetStringKeys<Add_Post_Values_Form>
const AddPostFrom: React.FC<InjectedFormProps<Add_Post_Values_Form>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField<Add_POST_VALUES_FORM_KEYS>("Enter post's text", "addNewPost", [required, maxLength10], Textarea)}
        <button>create post</button>
    </form>
}
const AddPostFormRedux = reduxForm<Add_Post_Values_Form> ({form: "addPost"})(AddPostFrom)
export default Posts