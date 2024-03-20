import { Video } from "lib/api/getVideo";

export default function WatchPageDescription({ video }: { video: Video }) {
  return (
    <div className="bg-black dark:bg-white text-white dark:text-black bg-opacity-50 rounded-xl flex flex-col p-4">
      {video?.description.split("\n").map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
}
