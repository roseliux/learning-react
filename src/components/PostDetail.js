import Post from "./Post"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { get_post } from "./api/endpoints"

const PostDetail = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const response = await get_post(id);
            setPost(response);
        }
        fetchPost();
    }, [id]);

      if (!post) return <div>Loading...</div>;

    return (
        <div className="post-detail">
            <h1>Post Detail</h1>
            <Post id={post.id} post_title={post.title} post_body={post.body} />
        </div>
    );
}

export default PostDetail;