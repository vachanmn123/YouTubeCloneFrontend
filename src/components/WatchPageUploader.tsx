import { Video } from "lib/api/getVideo";
import { Link } from "react-router-dom";
import getUser from "../../lib/api/getuser";
import { useQuery } from "@tanstack/react-query";
import SubscribeButton from "./SubscribeButton";

export default function WatchPageUploader({ video }: { video: Video }) {
  const { data: uploader, isLoading: uploaderLoading } = useQuery({
    queryKey: ["user", video.uploader],
    queryFn: () => getUser(video.uploader),
  });

  if (uploaderLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="flex items-center">
      <Link to={`/channel/${uploader?._id}`} className="flex">
        <img
          src={uploader?.imageURL}
          alt={uploader?.userName}
          className="rounded-full h-10 w-10 object-cover aspect-square"
        />
        <div className="flex flex-col">
          <p className="font-bold">{uploader?.userName}</p>
          <p className="text-gray-600">
            {uploader?.subscriberCount} Subscribers
          </p>
        </div>
      </Link>
      <SubscribeButton uploader={video?.uploader} />
    </div>
  );
}
