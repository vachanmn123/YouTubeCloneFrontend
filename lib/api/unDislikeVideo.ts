
const API_URL = import.meta.env.VITE_API_ROOT as string;

type UnDislikeVideoReturnType = {
  message: string;
}

export default async function unDislikeVideo(videoId: string, token: string) {
  const res = await fetch(`${API_URL}/videos/${videoId}/undislike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to undislike video");
  }
  const data = await res.json();
  return data as UnDislikeVideoReturnType;
}