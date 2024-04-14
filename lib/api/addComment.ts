const API_URL = import.meta.env.VITE_API_ROOT as string;

export type Comment = {
  _id: string;
  text: string;
  user: string; // User ID
  likeCount: number;
  replies: string[]; // Comment IDs
  parent: string | null; // Comment ID
  video: string; // Video ID
  date: string; // Date string
}

type AddCommentReturnType = {
  message: string;
  comment: Comment;
}

export default async function addComment(videoID: string, text: string, token: string) {
  const res = await fetch(`${API_URL}/comments/${videoID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ 
      text,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to add comment");
  }
  const data = await res.json();
  return data as AddCommentReturnType;
}