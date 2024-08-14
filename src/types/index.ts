import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { THEME_SIZES } from "@assets/styles/constants";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

export interface ContextProviderProps {
    children: React.ReactNode;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ThemeSize = keyof typeof THEME_SIZES;

export type Operator =
    | "<"
    | "<="
    | "=="
    | "!="
    | ">="
    | ">"
    | "array-contains"
    | "in"
    | "not-in"
    | "array-contains-any";

export type DataGridColumn = GridColDef<GridValidRowModel> & GridColDef<any>;

export interface QueryParams {
    [key: string]: string | undefined;
}

export type TableState = GridInitialStateCommunity;

export type Direction = "asc" | "desc";

export type Order<T> = [field: keyof T, direction: Direction];

export type Condition<T> = [
    field: keyof T,
    operator: Operator,
    value: T[keyof T]
];

const timeOptions = ["week", "month", "year"] as const;
export type TimeGroup = (typeof timeOptions)[number];
