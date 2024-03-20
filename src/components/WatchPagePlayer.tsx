import { Video } from "lib/api/getVideo";
import { useQuery } from "@tanstack/react-query";
import getVideoURL from "../../lib/api/getVideoURL";

export default function WatchPagePlayer({ video }: { video: Video }) {
  const { data: videoURL, isLoading: videoURLLoading } = useQuery({
    queryKey: ["videoURL", video._id],
    queryFn: () => getVideoURL(video._id),
  });
  if (videoURLLoading) {
    return <p>Loading...</p>;
  }
  return (
    <video controls className="rounded-xl">
      <source src={videoURL} />
    </video>
  );
}
