enum LogoutReturnStatus {
  "success"
}

type LogoutReturnType = {
  status: LogoutReturnStatus;
}


export async function logout() : Promise<LogoutReturnType> {
  localStorage.removeItem("JWTToken");
  localStorage.removeItem("JWTTokenExpiresAt");
  return {status: LogoutReturnStatus.success}
}