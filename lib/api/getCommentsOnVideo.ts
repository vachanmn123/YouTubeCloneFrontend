
const API_URL = import.meta.env.VITE_API_ROOT as string;

export type Comment = {
  _id: string;
  text: string;
  user: string; // This is the user's _id
  likes: string[]; // This is an array of user _ids
  likeCount: number;
  replies: string[]; // This is an array of comment _ids
  parent: string | null; // This is the _id of the parent comment
  video: string; // This is the _id of the video
  date: string; // This is the date the comment was created
}

export default async function getCommentsOnVideo(videoId: string) {
  const res = await fetch(`${API_URL}/comments/${videoId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as Comment[];
}
