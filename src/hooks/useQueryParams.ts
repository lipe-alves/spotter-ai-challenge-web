import { useMemo } from "react";
import { getQueryParams } from "@utils";
import { QueryParams } from "@types";

/** Returns query params of location url */
function useQueryParams<T extends QueryParams>(): T {
    const params = useMemo(() => {
        if (!window) return {};

        return getQueryParams<T>(window.location.href);
    }, []);

    return params as T;
}

export default useQueryParams;
export { useQueryParams };
