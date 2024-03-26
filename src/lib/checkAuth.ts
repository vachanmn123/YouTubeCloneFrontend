
export function checkAuth() : boolean {
  const token = localStorage.getItem("JWTToken");
  if (!token) return false;
  const expiresAt = localStorage.getItem("JWTTokenExpiresAt");
  if (!expiresAt) return false;
  if (Date.now() > parseInt(expiresAt)) return false;
  return token ? true : false;
}