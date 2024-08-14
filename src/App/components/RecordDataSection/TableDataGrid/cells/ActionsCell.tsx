import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
} from "@mui/icons-material";

import { useTables } from "@providers";

import { CellProps } from "./index";
import RecordRow from "@models/RecordRow";

function ActionsCell(props: CellProps) {
    const { row } = props;
    const { allMainTableRows, setMainTableState, rowModes, setRowModes } =
        useTables();

    const id = row.id;
    const isInEditMode = rowModes[id]?.mode === GridRowModes.Edit;

    const handleEditRow = () => {
        setRowModes((prev) => ({
            ...prev,
            [id]: { mode: GridRowModes.Edit },
        }));
    };

    const handleSaveRow = () => {
        setRowModes((prev) => ({
            ...prev,
            [id]: { mode: GridRowModes.View },
        }));
    };

    const handleDeleteRow = () => {
        setMainTableState((prev) => {
            const oldRow =
                prev.rows[id] || allMainTableRows.find((row) => row.id === id);

            prev.rows[id] = RecordRow.create({
                ...oldRow,
                isDeleted: true,
            });

            return { ...prev };
        });
    };

    const handleCancelRowEdition = () => {
        setRowModes({
            ...rowModes,
            [id]: {
                mode: GridRowModes.View,
                ignoreModifications: true,
            },
        });

        const editedRow = allMainTableRows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setMainTableState((prev) => {
                delete prev.rows[id];
                return { ...prev };
            });
        }
    };

    if (isInEditMode) {
        return [
            <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                onClick={handleSaveRow}
                sx={{
                    color: "success.main",
                }}
            />,
            <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                onClick={handleCancelRowEdition}
                sx={{
                    color: "error.main",
                }}
            />,
        ];
    }

    return [
        <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditRow}
            sx={{
                color: "primary.main",
            }}
        />,
        <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteRow}
            sx={{
                color: "error.main",
            }}
        />,
    ];
}

export default ActionsCell;
export { ActionsCell };
