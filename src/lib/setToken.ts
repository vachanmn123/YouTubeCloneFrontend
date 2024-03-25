export default async function setToken(token: string) : Promise<void> {
  localStorage.setItem("JWTToken", token);
}