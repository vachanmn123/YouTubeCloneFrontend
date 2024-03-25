export function getToken() : string | null {
  const token = localStorage.getItem("JWTToken");
  return token;
}