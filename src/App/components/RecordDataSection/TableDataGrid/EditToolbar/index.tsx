import { Button } from "@mui/material";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import { Add as AddIcon, RotateLeft as ResetIcon } from "@mui/icons-material";

import Record from "@models/Record";
import RecordRow from "@models/RecordRow";

import { useSetup, useTables } from "@providers";
import { generateId } from "@utils";

function EditToolbar() {
    const { currentDashboard } = useSetup();
    const { setMainTableState, setRowModes, syncMainTable } = useTables();

    const handleAddRecord = () => {
        const id = generateId(7);
        const record = Record.create({ id });
        const newRow = RecordRow.create({
            ...record,
            isNew: true,
            isEdited: false,
        });

        setMainTableState((prev) => {
            prev.rows = {
                [id]: newRow,
                ...prev.rows,
            };
            return { ...prev };
        });
        setRowModes((oldModel) => ({
            ...oldModel,
            [id]: {
                mode: GridRowModes.Edit,
                fieldToFocus: "legalName",
            },
        }));
    };

    const handleResetRecords = () => {
        setMainTableState((prev) => ({
            ...prev,
            rows: { ...currentDashboard.mainTableState.rows },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleAddRecord}
            >
                Add record
            </Button>
            <Button
                color="primary"
                startIcon={<ResetIcon />}
                onClick={handleResetRecords}
            >
                Reset records
            </Button>
        </GridToolbarContainer>
    );
}

export default EditToolbar;
export { EditToolbar };
