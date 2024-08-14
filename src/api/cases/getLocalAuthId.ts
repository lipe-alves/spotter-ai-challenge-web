import { LOCAL_STORAGE_AUTH_ID_KEY } from "../constants";

async function getLocalAuthId(): Promise<string | null> {
    return localStorage.getItem(LOCAL_STORAGE_AUTH_ID_KEY);
}

export { getLocalAuthId };
export default getLocalAuthId;
