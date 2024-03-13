import LoaderBig from "@/components/shared/LoaderBig";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/query";

const Home = () => {
  const { data: recentPosts, isPending: isLoading } = useGetRecentPosts();

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md;h2-bold text-left w-full">Home Feed</h2>
          {isLoading && !recentPosts ? (
            <LoaderBig />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {recentPosts?.documents?.map((post: any) => (
                <li key={post.$id}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
