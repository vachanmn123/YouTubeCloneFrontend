import { Video } from "lib/api/getVideo";
import { Button } from "./ui/button";
import getCommentsOnVideo from "../../lib/api/getCommentsOnVideo";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";

export default function WatchPageComments({ video }: { video: Video }) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", video._id],
    queryFn: () => getCommentsOnVideo(video._id),
  });
  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-2xl font-bold mb-3">Comments</h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Add a public comment..."
          className="p-3 rounded-full bg-black dark:bg-white dark:text-black text-white h-full w-[90%]"
        />
        {/* Handle Commenting */}
        <Button className="h-full w-[10%] p-3 rounded-full">Comment</Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
