const API_URL = import.meta.env.VITE_API_ROOT as string;

type unlikeCommentReturnType = {
  message: string;
}

export default async function unlikeComment(commentID:string, token: string) {
  const res = await fetch(`${API_URL}/comments/${commentID}/unlike`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to unlike comment");
  }
  const data = await res.json();
  return data as unlikeCommentReturnType;
}