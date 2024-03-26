export function getToken() : string | null {
  const token = localStorage.getItem("JWTToken");
  if (!token) return null;
  const expiresAt = localStorage.getItem("JWTTokenExpiresAt");
  if (!expiresAt) return null;
  if (Date.now() > parseInt(expiresAt)) return null;
  return token;
}