
const API_URL = import.meta.env.VITE_API_ROOT as string;

type LikeReturnType = {
  message: string;
}

export default async function likeVideo(videoId: string, token: string) {
  const res = await fetch(`${API_URL}/videos/${videoId}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to like video");
  }
  const data = await res.json();
  return data as LikeReturnType;
}