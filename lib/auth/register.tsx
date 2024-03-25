const AUTH_URL = import.meta.env.VITE_AUTH_ROOT as string;

export type RegistrationOptions = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export default async function register(userInfo: RegistrationOptions) {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });
  if (!res.ok) {
    throw new Error((await res.json()).message);
  }
  return res.json() as Promise<{ message: string }>;
}
