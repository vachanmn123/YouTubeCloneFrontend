
const API_URL = import.meta.env.VITE_API_ROOT as string;

type UserObjectID = string;
type CommentObjectID = string;

export type Video = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  location: string;
  duration: number;
  uploader: string;
  privacy: "public" | "private" | "unlisted";
  uploadDate: Date;
  likes: Array<UserObjectID>;
  likeCount: number;
  dislikes: Array<UserObjectID>;
  dislikeCount: number;
  views: number;
  comments: Array<CommentObjectID>;
}

export default async function getVideo(id: string) {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as Video;
}