
const API_URL = import.meta.env.VITE_API_ROOT as string;

type SubscribeReturnType = {
  message: string;

}


export default async function subscribeChannel(channelID:string, token:string) {
  const res = await fetch(`${API_URL}/user/${channelID}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!res.ok) {
    console.error(res);
    throw new Error("Failed to subscribe video");
  }
  const data = await res.json();
  return data as SubscribeReturnType;
}