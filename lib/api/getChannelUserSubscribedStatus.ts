const API_URL = import.meta.env.VITE_API_ROOT as string;

type GetChannelUserSubscribedStatusReturnType = {
  isSubscribed: boolean;
}

export default async function getChannelUserSubscribedStatus(channelId: string, token: string) {
  const res = await fetch(`${API_URL}/user/${channelId}/isSubscribed`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get channel user subscribed status");
  }
  const data = await res.json();
  return data as GetChannelUserSubscribedStatusReturnType;
}