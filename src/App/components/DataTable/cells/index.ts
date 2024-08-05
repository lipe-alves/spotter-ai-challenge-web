import { Record } from "@models";

export interface CellProps {
    row: Record;
}

export * from "./IdCell";
export * from "./DateCell";
export * from "./OperatingStatusCell";
export * from "./TextCell";
export * from "./EntityCell";
