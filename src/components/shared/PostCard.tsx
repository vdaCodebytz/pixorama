import { useAuthContext } from "@/context/AuthContext";
import { getRelativeTime } from "@/lib/helper";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useAuthContext();
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "/assets/icons/profile_placeholder.png"
              }
              alt="Creator"
              className="rounded-full lg:h-12 w-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="base-medium text-light-1 lg:body-bold">
              {post?.creator?.name}
            </p>
            <div className="flex-center gap-2 text-light-3 ">
              <p className="subtle-semibold lg:small-regular">
                {getRelativeTime(post?.$createdAt)} • {post?.location}
              </p>
            </div>
          </div>
        </div>
        {user.id === post.creator.$id && (
          <Link to={`/update-post/${post.$id}`}>
            <img src="/assets/icons/edit-icon.svg" alt="Edit" className="w-6" />
          </Link>
        )}
      </div>
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post?.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post?.tags?.map((tag: string) => (
              <li key={tag} className="text-light-3">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post?.imageUrl || "/assets/icons/profile_placeholder.png"}
          className="post-card_img"
          alt="post image"
        />
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  );
};
export default PostCard;
