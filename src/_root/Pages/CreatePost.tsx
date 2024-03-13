import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/wallpaper-add.png"
            alt="add"
            className="h-10 w-10"
          />
          <h2 className="text-2xl md:text-3xl text-left w-full">Create Post</h2>
        </div>
        <PostForm action="Create" />
      </div>
    </div>
  );
};
export default CreatePost;
