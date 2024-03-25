import { User } from "lib/api/getuser";

const AUTH_URL = import.meta.env.VITE_AUTH_ROOT as string;

export default async function getAuthUser() {
  const token = localStorage.getItem("JWTToken");
  if (!token) {
    return null;
  }
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  const data = await res.json();
  return data as User;
}