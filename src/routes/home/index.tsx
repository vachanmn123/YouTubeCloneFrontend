import PageBase from "@/components/PageBase";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getVideos from "../../../lib/api/getVideos";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

function generateDurationString(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 19);
}

export default function HomePage() {
  const {
    data: videos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    refetchInterval: 10000,
  });
  return (
    <PageBase>
      <Helmet>
        <title>Home | YouTube Clone</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-5">Recommended</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading videos</p>}
      <div className="flex flex-wrap gap-5 w-full justify-evenly">
        {videos?.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id}>
            <Card
              key={video._id}
              className="p-3 hover:scale-105 transition-all"
            >
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
                    {/* TODO: Replace with uploader image */}
                    <img
                      src="https://source.unsplash.com/random?person"
                      alt="Uploader"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                  <div className="">
                    <p className="font-bold">{video.title}</p>
                    <p className="text-gray-500">{video.uploader}</p>
                    <p className="text-gray-500">
                      {video.views} views • {video.uploadDate.toString()}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </PageBase>
  );
}
