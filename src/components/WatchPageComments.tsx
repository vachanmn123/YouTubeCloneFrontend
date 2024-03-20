import { Video } from "lib/api/getVideo";
import { Button } from "./ui/button";

export default function WatchPageComments({ video }: { video: Video }) {
  return (
    <div className="flex flex-col mt-5">
      <h1 className="text-2xl font-bold mb-3">Comments</h1>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Add a public comment..."
          className="p-3 rounded-full bg-black dark:bg-white dark:text-black text-white h-full w-[90%]"
        />
        {/* Handle Commenting */}
        <Button className="h-full w-[10%] p-3 rounded-full">Comment</Button>
      </div>

      {video?.comments.map((comment) => (
        <div key={comment} className="flex flex-col">
          {/* TODO: Add comment Component */}
          <p>Comment</p>
        </div>
      ))}
    </div>
  );
}
