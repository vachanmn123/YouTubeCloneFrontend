const AUTH_URL = import.meta.env.VITE_AUTH_ROOT as string;

export type LoginRequestOptions = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string; // The JWT token
};

export default async function login(userInfo: LoginRequestOptions) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  if (!res.ok) {
    if (res.status == 401) {
      throw new Error("Invalid username or password");
    }
    throw new Error(res.statusText);
  }
  const data = (await res.json()) as LoginResponse;
  return data;
}
