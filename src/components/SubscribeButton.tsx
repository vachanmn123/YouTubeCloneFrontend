import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getChannelUserSubscribedStatus from "../../lib/api/getChannelUserSubscribedStatus";
import { getToken } from "../lib/getToken";
import { checkAuth } from "../lib/checkAuth";
import { Button } from "./ui/button";
import subscribeChannel from "../../lib/api/subscribeChannel";
import unSubscribeChannel from "../../lib/api/unSubscribeChannel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SubscribeButton({ uploader }: { uploader: string }) {
  const qClient = useQueryClient();
  const { data: isSubscribed } = useQuery({
    queryKey: ["isSubscribed", uploader],
    queryFn: async () => {
      if (!checkAuth()) {
        return false;
      }
      if (!getToken()) {
        return false;
      }
      const status = await getChannelUserSubscribedStatus(
        uploader,
        // @ts-expect-error - Handled by checkAuth
        getToken()
      );
      return status.isSubscribed;
    },
  });
  const subscribe = useMutation({
    mutationKey: ["subscribe"],
    mutationFn: async () => {
      const isLogged = checkAuth();
      if (!isLogged) {
        return null;
      }
      const token = getToken();
      if (!token) {
        return null;
      }
      return await subscribeChannel(uploader, token);
    },
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["isSubscribed", uploader],
      });
    },
  });
  const unSubscribe = useMutation({
    mutationKey: ["unSubscribe"],
    mutationFn: async () => {
      const isLogged = checkAuth();
      if (!isLogged) {
        return null;
      }
      const token = getToken();
      if (!token) {
        return null;
      }
      return await unSubscribeChannel(uploader, token);
    },
    onSuccess: () => {
      qClient.invalidateQueries({
        queryKey: ["isSubscribed", uploader],
      });
    },
  });
  return (
    <Button
      className="ml-3 text-center"
      variant={`${isSubscribed ? "outline" : "default"}`}
      onClick={() => (isSubscribed ? unSubscribe.mutate() : subscribe.mutate())}
    >
      {subscribe.isPending || unSubscribe.isPending ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : isSubscribed ? (
        "Unsubscribe"
      ) : (
        "Subscribe"
      )}
    </Button>
  );
}
