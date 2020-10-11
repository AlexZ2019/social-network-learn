import Posts from "./Posts";
import {connect} from "react-redux";
import {addPostActionCreator, AddPostActionCreatorType} from "../../../Redux/Reducers/profile-reducer";
import {AppStateType} from "../../../Redux/redux-store";
import {PostType} from "../../../Redux/Types/types";
import {Dispatch} from "redux";

// class PostsContainer extends Component {
//     state = this.props.store.getState();
//     onPostChange = (new_post_body) => {
//         let action = userTextPostWriteActionCreator(new_post_body);
//         this.props.store.dispatch(action);
//     };
//     create_post = () => {
//         this.props.store.dispatch(addPostActionCreator());
//     };
//
//     render() {
//         return (
//             <Posts updateNewPostText={this.onPostChange}
//                    addPost={this.create_post}
//                    posts={this.state.profile.posts_from_server}
//                    newPostText={this.state.profile.newPostText}
//             />
//         )
//     }
// }
type MapStateType = {
    posts: Array<PostType>
}
type MapDispatchType = {
    create_post: (newPost: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateType => {
  return {
      posts: state.profile.posts_from_server
  }
};
let mapDispatchToProps = (dispatch: Dispatch<AddPostActionCreatorType>): MapDispatchType => {
    return {
        create_post: (newPost: string) => {
            dispatch(addPostActionCreator(newPost))
        }
    }
};
const  PostsContainer = connect<MapStateType, MapDispatchType, unknown, AppStateType> (mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer