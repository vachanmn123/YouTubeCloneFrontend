enum LogoutReturnStatus {
  "success"
}

type LogoutReturnType = {
  status: LogoutReturnStatus;
}


export async function logout() : Promise<LogoutReturnType> {
  localStorage.removeItem("JWTToken");
  return {status: LogoutReturnStatus.success}
}