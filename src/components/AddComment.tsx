import { Button } from "./ui/button";
import addComment from "../../lib/api/addComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getToken } from "../lib/getToken";
import { checkAuth } from "..//lib/checkAuth";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function AddComment({ videoID }: { videoID: string }) {
  const navigate = useNavigate();
  const qClient = useQueryClient();
  const [text, setText] = useState("");
  const commentAdd = useMutation({
    mutationKey: ["addComment"],
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
      if (text.trim() === "") {
        return null;
      }
      const data = await addComment(videoID, text, token);
      // reset the text field
      setText("");
      return data;
    },
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["comments", videoID],
      });
    },
  });

  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      <input
        type="text"
        placeholder="Add a public comment..."
        className="p-3 rounded-full bg-black dark:bg-white dark:text-black text-white h-full md:w-[90%] w-full mb-3"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Button
        className="h-full md:w-[10%] p-3 rounded-full w-full mb-3"
        disabled={commentAdd.isPending || text.trim() === ""}
        onClick={() => commentAdd.mutate()}
      >
        {commentAdd.isPending ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "Add"
        )}
      </Button>
    </div>
  );
}
