import {Video} from "./getVideos";

const API_URL = import.meta.env.VITE_API_ROOT as string;


export default async function getUserVideos(userId: string) {
  const res = await fetch(`${API_URL}/user/${userId}/videos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as Video[];
}