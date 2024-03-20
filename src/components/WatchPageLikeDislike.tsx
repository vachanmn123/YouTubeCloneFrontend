import { Video } from "lib/api/getVideo";
import { Button } from "./ui/button";
import { FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";

export default function WatchPageLikeDislike({ video }: { video: Video }) {
  return (
    <div className="flex gap-5">
      <div className="bg-black dark:bg-white bg-opacity-50 rounded-full flex items-center gap-5 justify-self-end">
        <Button className="group rounded-full h-full" variant={"ghost"}>
          <FaThumbsUp className="h-6 w-6 mr-3" />
          <p className="text-white group-hover:text-black dark:text-black">
            {video?.likeCount}
          </p>
        </Button>
        <Button variant={"ghost"} className="group rounded-full h-full">
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
  );
}
