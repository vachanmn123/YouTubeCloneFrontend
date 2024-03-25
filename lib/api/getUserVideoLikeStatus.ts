
const API_URL = import.meta.env.VITE_API_ROOT as string;

type GetUserVideoLikeStatusReturnType = {
  userLiked: boolean;
}

export default async function getUserVideoLikeStatus(videoId: string, token: string) {
  const res = await fetch(`${API_URL}/videos/${videoId}/userLiked`, {
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get user video like status");
  }
  const data = await res.json();
  return data as GetUserVideoLikeStatusReturnType;
}