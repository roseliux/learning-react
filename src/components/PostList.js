import Post from "./Post";
import Loader from "./Loader";

const PostList = ({posts, isLoading}) => {
    return (
        <div className="post-list">
            {
                posts.map((post) => {
                    return (<Post key={post.id} id={post.id} post_title={post.title} post_body={post.body} />)
                })
            }
            {isLoading && <Loader />}
        </div>
    );
}

export default PostList;
