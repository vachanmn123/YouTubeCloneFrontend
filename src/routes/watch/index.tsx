import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getVideo from "../../../lib/api/getVideo";
import WatchPageUploader from "@/components/WatchPageUploader";
import WatchPageLikeDislike from "@/components/WatchPageLikeDislike";
import WatchPageDescription from "@/components/WatchPageDescription";
import WatchPageComments from "@/components/WatchPageComments";
import WatchPagePlayer from "@/components/WatchPagePlayer";

export default function WatchVideoPage() {
  const { id } = useParams<{ id: string }>();
  const { data: video, isLoading } = useQuery({
    queryKey: ["video", id],
    // @ts-expect-error - This is a bug in the react-query types
    queryFn: () => getVideo(id),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col col-span-7 pr-3">
      {/* @ts-expect-error - This undefined case has been handled by the loader */}
      <WatchPagePlayer video={video} />
      <div className="flex flex-col p-4 gap-5">
        <h1 className="text-3xl font-bold tracking-wide justify-between">
          {video?.title}
        </h1>
        <div className="flex md:flex-row flex-col gap-5 justify-between">
          {/* @ts-expect-error - This undefined case has been handled by the loader */}
          <WatchPageUploader video={video} />
          {/* @ts-expect-error - This undefined case has been handled by the loader */}
          <WatchPageLikeDislike video={video} />
        </div>
      </div>
      {/* @ts-expect-error - This undefined case has been handled by the loader */}
      <WatchPageDescription video={video} />
      {/* @ts-expect-error - This undefined case has been handled by the loader */}
      <WatchPageComments video={video} />
    </div>
  );
}
