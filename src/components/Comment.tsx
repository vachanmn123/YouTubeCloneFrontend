import { Comment } from "lib/api/getCommentsOnVideo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUser from "../../lib/api/getuser";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "../lib/checkAuth";
import { getToken } from "../lib/getToken";
import likeComment from "../../lib/api/likeComment";
import unlikeComment from "../../lib/api/unlikeComment";
import { useEffect, useState } from "react";
import getAuthUser from "@/lib/getAuthuser";

export default function Comment({ comment }: { comment: Comment }) {
  const [isLiked, setIsLiked] = useState(false);
  const naviagte = useNavigate();
  const qClient = useQueryClient();
  const { data: commenter } = useQuery({
    queryKey: ["user", comment.user],
    queryFn: () => getUser(comment.user),
  });
  const commentLike = useMutation({
    mutationKey: ["likeComment", comment._id],
    mutationFn: async () => {
      if (!checkAuth()) {
        naviagte("/auth/login");
        return null;
      }
      const token = getToken();
      if (!token) {
        naviagte("/auth/login");
        return null;
      }
      return await likeComment(comment._id, token);
    },
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["comments", comment.video],
      });
    },
  });
  const commentUnlike = useMutation({
    mutationKey: ["unlikeComment", comment._id],
    mutationFn: async () => {
      if (!checkAuth()) {
        naviagte("/auth/login");
        return null;
      }
      const token = getToken();
      if (!token) {
        naviagte("/auth/login");
        return null;
      }
      return await unlikeComment(comment._id, token);
    },
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["comments", comment.video],
      });
    },
  });
  useEffect(() => {
    (async () => {
      const user = await getAuthUser();
      if (!user) return;
      setIsLiked(comment.likes.includes(user._id));
    })();
  });
  return (
    <div className="flex flex-col mt-3 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <Link
          to={`/channel/${commenter?._id}`}
          className="h-[3rem] w-[3rem] rounded-full aspect-square"
        >
          <img
            src={commenter?.imageURL || "/avatar.png"}
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
            onClick={() =>
              isLiked ? commentUnlike.mutate() : commentLike.mutate()
            }
          >
            {isLiked ? "Unlike" : "Like"}
          </span>
        </div>
      </div>
    </div>
  );
}
