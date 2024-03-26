import login, {LoginRequestOptions} from "../../lib/auth/login";
import { getToken } from "./getToken";
import setToken from "./setToken";

export enum LoginFlowReturnStatus {
  "success",
  "error"
}

type LoginFlowReturn = {
  status: LoginFlowReturnStatus;
  message?: string | null;
}

export default async function loginFlow(userInfo: LoginRequestOptions) : Promise<LoginFlowReturn> {
  try {
    if (await getToken()) {
      return {status: LoginFlowReturnStatus.success}
    }
    const {token, expiresAt} = await login(userInfo);
    setToken(token, expiresAt);
    return {status: LoginFlowReturnStatus.success}
  } catch (e) {
    return {status: LoginFlowReturnStatus.error, message: (e as Error).message}
  }
}