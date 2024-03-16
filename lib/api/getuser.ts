
const API_URL = import.meta.env.VITE_API_ROOT as string;

type User = {
  _id: string;
  userName: string;
  subscriberCount: number;
  firstName: string;
  lastName: string;
  imageURL: string;
}

export default async function getUser(userId: string) {
  const res = await fetch(`${API_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data as User;
}