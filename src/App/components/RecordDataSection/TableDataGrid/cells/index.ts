import { RecordRow } from "../index";

export interface CellProps {
    row: RecordRow;
}

export * from "./IdCell";
export * from "./DateCell";
export * from "./OperatingStatusCell";
export * from "./TextCell";
export * from "./EntityCell";
export * from "./ActionsCell";