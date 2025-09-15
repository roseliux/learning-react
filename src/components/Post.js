const Post = ({ id, post_title, post_body }) => {
    return (
        <div className="post">
            <h2>{id} - {post_title}</h2>
            <p>{post_body}</p>
        </div>
    );
}

export default Post;