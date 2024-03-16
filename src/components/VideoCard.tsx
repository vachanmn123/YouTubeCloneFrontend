import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "./ui/card";
import getUser from "../../lib/api/getuser";
import { Video } from "lib/api/getVideos";
import { FaRegUserCircle } from "react-icons/fa";

function generateDurationString(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 19);
}

export default function VideoCard({ video }: { video: Video }) {
  const uploader = useQuery({
    queryKey: ["user", video.uploader],
    queryFn: () => getUser(video.uploader),
  });
  return (
    <Card key={video._id} className="p-3 hover:scale-105 transition-all">
      <CardContent className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="object-fit rounded-lg h-[15rem] aspect-video"
          loading="lazy"
        />
        <p className="absolute bottom-7 right-9 text-right text-white bg-black bg-opacity-30 px-3 rounded-lg">
          {generateDurationString(video.duration)}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex gap-5">
          <div>
            {uploader.data?.imageURL !== "" ? (
              <img
                src={uploader.data?.imageURL || "/images/default-avatar.png"}
                alt="Uploader"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaRegUserCircle className="w-10 h-10 rounded-full object-cover" />
            )}
          </div>
          <div className="">
            <p className="font-bold">{video.title}</p>
            <p className="text-gray-500">
              {uploader.data?.firstName} {uploader.data?.lastName}
            </p>
            <p className="text-gray-500">
              {video.views} views • {video.uploadDate.toString()}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
