import { generateUid } from "@utils";
import { LOCAL_STORAGE_AUTH_ID_KEY } from "../constants";

async function generateLocalAuthId(): Promise<string> {
    const uid = generateUid("auth-");
    localStorage.setItem(LOCAL_STORAGE_AUTH_ID_KEY, uid);
    return uid;
}

export { generateLocalAuthId };
export default generateLocalAuthId;
