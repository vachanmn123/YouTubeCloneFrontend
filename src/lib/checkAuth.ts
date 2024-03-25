
export function checkAuth() : boolean {
  const token = localStorage.getItem("JWTToken");
  return token ? true : false;
}