import {User} from "./getuser";

const API_URL = import.meta.env.VITE_API_ROOT as string;

export default async function getUsers() {
  const res = await fetch(`${API_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data.users as User[];
}