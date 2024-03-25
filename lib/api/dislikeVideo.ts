
const API_URL = import.meta.env.VITE_API_ROOT as string;

type DislikeVideoReturnType = {
  message: string;
}

export default async function dislikeVideo(videoId: string, token: string) {
  const res = await fetch(`${API_URL}/videos/${videoId}/dislike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to dislike video");
  }
  const data = await res.json();
  return data as DislikeVideoReturnType;
}