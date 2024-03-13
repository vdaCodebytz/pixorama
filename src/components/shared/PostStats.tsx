import {
  useDeleteSavedPost,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/mutations";
import { useGetCurrentUser } from "@/lib/react-query/query";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (savedPost: Models.Document) => savedPost.post.$id === post.$id
  );

  const [likes, setLikes] = useState(post?.likes || []);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (savedPostRecord) {
      setIsSaved(true);
    }
  }, []);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const checkLiked = (likesArray: Models.Document[]) => {
    return likesArray.find((likeUser) => likeUser.$id === userId);
  };

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let likesArray = [...likes];
    if (checkLiked(likesArray)) {
      likesArray = likesArray.filter((likeUser) => likeUser.$id !== userId);
    } else {
      likesArray.push(currentUser);
    }
    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
    }
    setIsSaved(!isSaved);
  };

  return (
    <div className="flex justify-between items-center z-20 ">
      <div className="flex gap-2 items-center">
        <img
          src={`/assets/icons/like${checkLiked(likes) ? "d" : ""}-icon.svg`}
          alt="like"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2items-center">
        <img
          src={`/assets/icons/save${isSaved ? "d" : ""}-icon.svg`}
          alt="like"
          className="cursor-pointer w-6"
          onClick={handleSavePost}
        />
      </div>
    </div>
  );
};
export default PostStats;
