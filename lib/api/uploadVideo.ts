const API_URL = import.meta.env.VITE_API_ROOT as string;

export default async function uploadVideo(data: FormData, token: string) {
  const resp = await fetch(`${API_URL}/videos`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: data,
  });
  if (!resp.ok) {
    console.error(await resp.text());
    throw new Error("Failed to upload video");
  }
  const res = await resp.json();
  return res;
}
