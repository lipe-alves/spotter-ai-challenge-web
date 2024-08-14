import { QueryParams } from "@types";

function getQueryParams<T extends QueryParams>(url: string): T {
    const [, search = ""] = url.split("?");
    const queryString = decodeURIComponent(search);
    const urlParams = queryString
        .split("&")
        .filter(Boolean)
        .map((keyValuePairStr) => keyValuePairStr.split("="));

    const params: QueryParams = {};

    for (const [key, value] of urlParams) {
        params[key] = value;
    }

    return params as T;
}

export default getQueryParams;
export { getQueryParams };
