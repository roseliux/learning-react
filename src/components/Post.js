import { Link } from "react-router-dom";

const Post = ({ id, post_title, post_body }) => {
    return (
        <div className="post">
            <Link to={`/posts/${id}`}>
                <h2>{id} - {post_title}</h2>
            </Link>
            <p>{post_body}</p>
        </div>
    );
}

export default Post;