
const API_URL = import.meta.env.VITE_API_ROOT as string;

type UnLikeReturnType = {
  message: string;
}

export default async function unLikeVideo(videoId: string, token: string) {
  const res = await fetch(`${API_URL}/videos/${videoId}/unlike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to unlike video");
  }
  const data = await res.json();
  return data as UnLikeReturnType;
}