export async function getToken() : Promise<string | null> {
  const token = localStorage.getItem("JWTToken");
  return token;
}