const PostCard = ({ post }) => {
    return (
        <div key={post.title}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
        </div>
    );
}

export default PostCard;