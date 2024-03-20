import { Comment } from "lib/api/getCommentsOnVideo";
import { useQuery } from "@tanstack/react-query";
import getUser from "../../lib/api/getuser";
import { Link } from "react-router-dom";

export default function Comment({ comment }: { comment: Comment }) {
  const { data: commenter } = useQuery({
    queryKey: ["user", comment.user],
    queryFn: () => getUser(comment.user),
  });
  return (
    <div className="flex flex-col mt-3 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <Link to={`/channel/${commenter?._id}`}>
          <img
            src={commenter?.imageURL}
            alt={`${commenter?.userName}'s profile picture`}
            className="h-[3rem] w-[3rem] rounded-full aspect-square object-cover"
          />
        </Link>
        <div>
          <Link to={`/channel/${commenter?._id}`}>
            <p className=" font-bold hover:underline">
              {commenter?.firstName} {commenter?.lastName}
            </p>
          </Link>
          <p className="text-xs">{comment?.date}</p>
          <p className="">{comment.text}</p>
          <p className="text-xs text-gray-500">Likes: {comment.likeCount}</p>
          <span
            className="text-xs underline mr-3 text-gray-500 hover:cursor-pointer"
            onClick={(e) => console.log("reply", e)}
          >
            Reply
          </span>
          <span
            className="text-xs underline text-gray-500 hover:cursor-pointer"
            onClick={(e) => console.log("like", e)}
          >
            Like
          </span>
        </div>
      </div>
    </div>
  );
}
