import { Video } from "lib/api/getVideo";
import { Button } from "./ui/button";
import { FaShare, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getUserVideoLikeStatus from "../../lib/api/getUserVideoLikeStatus";
import getUserVideoDislikeStatus from "../../lib/api/getUserVideoDislikeStatus";
import likeVideo from "../../lib/api/likeVideo";
import unLikeVideo from "../../lib/api/unlikeVideo";
import dislikeVideo from "../../lib/api/dislikeVideo";
import unDislikeVideo from "../../lib/api/unDislikeVideo";
import { getToken } from "@/lib/getToken";
import { checkAuth } from "@/lib/checkAuth";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function WatchPageLikeDislike({ video }: { video: Video }) {
  const qClient = useQueryClient();
  const navigate = useNavigate();
  const { data: isLiked } = useQuery({
    queryKey: ["isLiked", video._id],
    queryFn: async () => {
      if (!checkAuth()) {
        return false;
      }
      const token = getToken();
      if (!token) {
        return false;
      }
      const status = await getUserVideoLikeStatus(video._id, token);
      return status.userLiked;
    },
  });
  const { data: isDisliked } = useQuery({
    queryKey: ["isDisliked", video._id],
    queryFn: async () => {
      if (!checkAuth()) {
        return false;
      }
      const token = getToken();
      if (!token) {
        return false;
      }
      const status = await getUserVideoDislikeStatus(video._id, token);
      return status.userDisliked;
    },
  });
  const addLike = useMutation({
    mutationKey: ["likeVideo"],
    mutationFn: async () => {
      const isLogged = checkAuth();
      if (!isLogged) {
        navigate("/auth/login");
        return null;
      }
      const token = getToken();
      if (!token) {
        navigate("/auth/login");
        return null;
      }
      return likeVideo(video._id, token);
    },
    onSuccess: async () => {
      await qClient.invalidateQueries({
        queryKey: ["video", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isLiked", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isDisliked", video._id],
      });
    },
  });
  const removeLike = useMutation({
    mutationKey: ["removeLike"],
    mutationFn: async () => {
      const isLogged = checkAuth();
      if (!isLogged) {
        navigate("/auth/login");
        return null;
      }
      const token = getToken();
      if (!token) {
        navigate("/auth/login");
        return null;
      }
      return unLikeVideo(video._id, token);
    },
    onSuccess: async () => {
      await qClient.invalidateQueries({
        queryKey: ["video", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isLiked", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isDisliked", video._id],
      });
    },
  });
  const addDislike = useMutation({
    mutationKey: ["dislikeVideo"],
    mutationFn: async () => {
      const isLogged = checkAuth();
      if (!isLogged) {
        navigate("/auth/login");
        return null;
      }
      const token = getToken();
      if (!token) {
        navigate("/auth/login");
        return null;
      }
      return dislikeVideo(video._id, token);
    },
    onSuccess: async () => {
      await qClient.invalidateQueries({
        queryKey: ["video", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isLiked", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isDisliked", video._id],
      });
    },
  });
  const removeDislike = useMutation({
    mutationKey: ["removeDislike"],
    mutationFn: async () => {
      const isLogged = checkAuth();
      if (!isLogged) {
        navigate("/auth/login");
        return null;
      }
      const token = getToken();
      if (!token) {
        navigate("/auth/login");
        return null;
      }
      return unDislikeVideo(video._id, token);
    },
    onSuccess: async () => {
      await qClient.invalidateQueries({
        queryKey: ["video", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isLiked", video._id],
      });
      await qClient.invalidateQueries({
        queryKey: ["isDisliked", video._id],
      });
    },
  });
  return (
    <div className="flex gap-5">
      <div className="bg-black dark:bg-white bg-opacity-50 rounded-full flex items-center gap-5 justify-self-end">
        <Button
          className="group rounded-full h-full"
          variant={`${isLiked ? "default" : "ghost"}`}
          onClick={() => (isLiked ? removeLike.mutate() : addLike.mutate())}
        >
          {addLike.isPending || removeLike.isPending ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <>
              <FaThumbsUp className="h-6 w-6 mr-3" />
              <p className="text-white group-hover:text-black dark:text-black">
                {video?.likeCount}
              </p>
            </>
          )}
        </Button>
        <Button
          variant={`${isDisliked ? "default" : "ghost"}`}
          className="group rounded-full h-full"
          onClick={() =>
            isDisliked ? removeDislike.mutate() : addDislike.mutate()
          }
        >
          {addDislike.isPending || removeDislike.isPending ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <>
              <FaThumbsDown className="h-6 w-6 mr-3" />
              <p className="text-white group-hover:text-black dark:text-black">
                {video?.dislikeCount}
              </p>
            </>
          )}
        </Button>
      </div>
      <div className="bg-black dark:bg-white bg-opacity-50 rounded-full flex items-center gap-5 justify-self-end">
        {/* TODO: handle Share on non-share API browsers */}
        <Button
          variant={"ghost"}
          className="rounded-full h-full"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: video.title,
                text: video.description,
                url: window.location.href,
              });
            } else {
              alert(
                "Share not supported on this browser. The feature is still in development."
              );
            }
          }}
        >
          <FaShare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
