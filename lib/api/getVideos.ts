
const API_URL = import.meta.env.VITE_API_ROOT as string;

type Video = {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  location: string;
  duration: number;
  uploader: string; // TODO: This is actually a User object
  privacy: "public" | "private" | "unlisted";
  uploadDate: Date;
  likes: Array<string>; // TODO: This is actually a User object
  dislikes: Array<string>; // TODO: This is actually a User object
  views: number;
  comments: Array<string>; // TODO: This is actually a Comment object
}

export default async function getVideos() {
    const res = await fetch(`${API_URL}/videos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    const data = await res.json();
    return data.videos as Video[];
}