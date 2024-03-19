import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getVideo from "../../../lib/api/getVideo";
import getVideoURL from "../../../lib/api/getVideoURL";
import { motion } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import getUser from "../../../lib/api/getuser";
import { Button } from "@/components/ui/button";
import { FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function WatchVideoPage() {
  const { id } = useParams<{ id: string }>();
  const { data: video, isLoading } = useQuery({
    queryKey: ["video", id],
    // @ts-expect-error - This is a bug in the react-query types
    queryFn: () => getVideo(id),
  });
  const { data: videoURL, isLoading: videoURLLoading } = useQuery({
    queryKey: ["videoURL", id],
    // @ts-expect-error - This is a bug in the react-query types
    queryFn: () => getVideoURL(id),
  });
  const { data: uploader, isLoading: uploaderLoading } = useQuery({
    queryKey: ["user", video?.uploader],
    // @ts-expect-error - This is a bug in the react-query types
    queryFn: () => getUser(video?.uploader),
  });
  return (
    <div className="flex flex-col col-span-7 pr-3">
      {videoURLLoading ? (
        <motion.div
          className="flex flex-col w-full justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AiOutlineLoading3Quarters className="h-[15rem] w-[15rem] animate-spin" />
          <p className="text-2xl font-bold">Loading Video</p>
        </motion.div>
      ) : (
        <video controls className="rounded-xl">
          <source src={videoURL} />
        </video>
      )}
      {!isLoading && (
        <>
          <div className="flex flex-col p-4 gap-5">
            <h1 className="text-3xl font-bold tracking-wide justify-between">
              {video?.title}
            </h1>
            <div className="flex md:flex-row flex-col gap-5 justify-between">
              {!uploaderLoading && (
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
                    {/* TODO: Handle if already subscribed */}
                    <Button className="ml-3">Subscribe</Button>
                  </div>
                </Link>
              )}
              <div className="flex gap-5">
                <div className="bg-black dark:bg-white bg-opacity-50 rounded-full flex items-center gap-5 justify-self-end">
                  <Button
                    className="group rounded-full h-full"
                    variant={"ghost"}
                  >
                    <FaThumbsUp className="h-6 w-6 mr-3" />
                    <p className="text-white group-hover:text-black dark:text-black dark:group-hover:text-white">
                      {video?.likeCount}
                    </p>
                  </Button>
                  <Button
                    variant={"ghost"}
                    className="group rounded-full h-full"
                  >
                    <FaThumbsDown className="h-6 w-6 mr-3" />
                    <p className="text-white group-hover:text-black">
                      {video?.dislikeCount}
                    </p>
                  </Button>
                </div>
                <div className="bg-black dark:bg-white bg-opacity-50 rounded-full flex items-center gap-5 justify-self-end">
                  {/* TODO: handle Share */}
                  <Button variant={"ghost"} className="rounded-full h-full">
                    <FaShare className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-black dark:bg-white text-white dark:text-black bg-opacity-50 rounded-xl flex flex-col p-4">
            {video?.description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          <div className="flex flex-col mt-5">
            <h1 className="text-2xl font-bold mb-3">Comments</h1>
            <div className="flex flex-col md:flex-row items-center justify-center">
              <input
                type="text"
                placeholder="Add a public comment..."
                className="p-3 rounded-full bg-black dark:bg-white dark:text-black text-white h-full w-[90%]"
              />
              {/* Handle Commenting */}
              <Button className="h-full w-[10%] p-3 rounded-full">
                Comment
              </Button>
            </div>

            {video?.comments.map((comment) => (
              <div key={comment} className="flex flex-col">
                {/* TODO: Add comment Component */}
                <p>Comment</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
