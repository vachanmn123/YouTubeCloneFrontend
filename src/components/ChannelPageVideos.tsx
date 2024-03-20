import { useQuery } from "@tanstack/react-query";
import getUserVideos from "../../lib/api/getUserVideos";
import { User } from "lib/api/getuser";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

export default function ChannelPageVideos({ user }: { user: User }) {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["user", user._id, "videos"],
    queryFn: () => getUserVideos(user._id),
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* @ts-expect-error - This has been handled using the loader */}
      {videos.map((video) => (
        <Link to={`/watch/${video._id}`}>
          <VideoCard video={video} />
        </Link>
      ))}
    </div>
  );
}
