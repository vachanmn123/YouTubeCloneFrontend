export default async function setToken(token: string, expiresAt: number) : Promise<void> {
  localStorage.setItem("JWTToken", token);
  localStorage.setItem("JWTTokenExpiresAt", expiresAt.toString());
}