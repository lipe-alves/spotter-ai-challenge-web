import { GridRowModes } from "@mui/x-data-grid";
import Record from "./Record";

interface RecordRowModes {
    [id: string]: {
        mode: GridRowModes;
        fieldToFocus?: keyof RecordRow;
        ignoreModifications?: boolean;
    };
}

class RecordRow extends Record {
    public isNew: boolean;
    public isEdited: boolean;
    public isDeleted: boolean;

    protected constructor(data: Partial<RecordRow> = {}) {
        const {
            legalName = "-",
            dbaName = "-",
            isNew = false,
            isEdited = false,
            isDeleted = false,
            ...rest
        } = data;
        const operatingStatus = rest.operatingStatus || "UNSPECIFIED";

        super({
            ...rest,
            operatingStatus,
            legalName,
            dbaName,
        });

        this.isNew = !!isNew;
        this.isEdited = !!isEdited;
        this.isDeleted = !!isDeleted;
    }

    public static override create(data?: Partial<RecordRow>): RecordRow {
        return new RecordRow(data);
    }
    public static override keys(): (keyof Record)[] {
        return Object.keys(new RecordRow()) as (keyof Record)[];
    }
}

export default RecordRow;
export { RecordRow };
export type { RecordRowModes };
