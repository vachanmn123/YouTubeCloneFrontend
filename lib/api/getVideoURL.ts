
const API_URL = import.meta.env.VITE_API_ROOT as string;

export default  async function getVideoURL(id: string) {
  const res = await fetch(`${API_URL}/videos/${id}/video`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
  });
  const data = await res.json();
  return data.url as string;
}