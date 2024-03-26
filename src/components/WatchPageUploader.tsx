import { Video } from "lib/api/getVideo";
import { Link } from "react-router-dom";
import getUser from "../../lib/api/getuser";
import getChannelUserSubscribedStatus from "../../lib/api/getChannelUserSubscribedStatus";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/getToken";
import { checkAuth } from "@/lib/checkAuth";

export default function WatchPageUploader({ video }: { video: Video }) {
  const { data: uploader, isLoading: uploaderLoading } = useQuery({
    queryKey: ["user", video.uploader],
    queryFn: () => getUser(video.uploader),
  });
  const { data: isSubscribed } = useQuery({
    queryKey: ["isSubscribed", video.uploader],
    queryFn: async () => {
      if (!checkAuth()) {
        return false;
      }
      if (!getToken()) {
        return false;
      }
      const status = await getChannelUserSubscribedStatus(
        video.uploader,
        // @ts-expect-error - Handled by checkAuth
        getToken()
      );
      return status.isSubscribed;
    },
  });
  if (uploaderLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Link to={`/channel/${uploader?._id}`}>
      <div className="flex items-center">
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
        {/* TODO: Handle subscription */}
        <Button
          className="ml-3"
          variant={`${isSubscribed ? "ghost" : "default"}`}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </Button>
      </div>
    </Link>
  );
}
