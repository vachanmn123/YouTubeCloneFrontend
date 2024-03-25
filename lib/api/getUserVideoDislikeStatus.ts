
const API_URL = import.meta.env.VITE_API_ROOT as string;

type GetUserVideoDislikeStatusReturnType = {
  userDisliked: boolean;
}

export default async function getUserVideoDislikeStatus(videoId: string, token: string) {
  const res = await fetch(`${API_URL}/videos/${videoId}/userDisliked`, {
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to get user video dislike status");
  }
  const data = await res.json();
  return data as GetUserVideoDislikeStatusReturnType;
}