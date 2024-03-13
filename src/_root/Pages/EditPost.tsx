import PostForm from "@/components/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/query";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/wallpaper-add.png"
            alt="add"
            className="h-10 w-10"
          />
          <h2 className="text-2xl md:text-3xl text-left w-full">Edit Post</h2>
        </div>
        <PostForm post={post} action="Update" />
      </div>
    </div>
  );
};
export default EditPost;
