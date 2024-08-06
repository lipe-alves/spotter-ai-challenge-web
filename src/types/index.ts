import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { THEME_SIZES } from "@assets/styles/constants";

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
