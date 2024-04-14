import { Video } from "lib/api/getVideo";
import getCommentsOnVideo from "../../lib/api/getCommentsOnVideo";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import AddComment from "./AddComment";

export default function WatchPageComments({ video }: { video: Video }) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", video._id],
    queryFn: () => getCommentsOnVideo(video._id),
  });
  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-2xl font-bold mb-3">Comments</h1>
      <AddComment videoID={video._id} />

      {isLoading && <p>Loading...</p>}
      {comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
}
