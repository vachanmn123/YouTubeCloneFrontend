const API_URL = import.meta.env.VITE_API_ROOT as string;

type likeCommentReturnType = {
  message: string;
}

export default async function likeComment(commentID: string, token: string) {
  const res = await fetch(`${API_URL}/comments/${commentID}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to like comment");
  }
  const data = await res.json();
  return data as likeCommentReturnType;
}