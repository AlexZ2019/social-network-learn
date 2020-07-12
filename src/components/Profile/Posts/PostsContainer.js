import Posts from "./Posts";
import {connect} from "react-redux";
import {addPostActionCreator} from "../../../Redux/Reducers/profile-reducer";

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
let mapStateToProps = (state) => {
  return {
      posts: state.profile.posts_from_server
  }
};
let mapDispatchToProps = (dispatch) => {
    return {
        create_post: (newPost) => {
            dispatch(addPostActionCreator(newPost))
        }
    }
};
const  PostsContainer = connect (mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer