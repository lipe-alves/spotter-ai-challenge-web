import { TextField, MenuItem } from "@mui/material";
import {
    GridEventListener,
    GridRowEditStopReasons,
    GridRowModel,
    GridSlots,
    GridRowModesModel,
} from "@mui/x-data-grid";

import { useDataset, useSetup, useTables } from "@providers";
import { useWindowSize } from "@hooks";
import { DataGridColumn } from "@types";

import Record, { EntityType } from "@models/Record";
import RecordRow, { RecordRowModes } from "@models/RecordRow";

import {
    DateCell,
    IdCell,
    OperatingStatusCell,
    TextCell,
    EntityCell,
    ActionsCell,
} from "./cells";
import { DataGridContainer } from "./styles";

import EditToolbar from "./EditToolbar";
import EntityEditCell from "./EntityEditCell";
import { useMemo } from "react";

function TableDataGrid() {
    const { loading, entityTypes, operatingStatuses } = useDataset();
    const { currentDashboard } = useSetup();
    const {
        mainTableApi,
        allMainTableRows,
        mainTableState,
        setMainTableState,
        rowModes,
        setRowModes,
    } = useTables();

    const [windowWidth] = useWindowSize();
    const isMobile = windowWidth <= 600;

    const handleRowEditStop: GridEventListener<"rowEditStop"> = (
        params,
        event
    ) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const processRowUpdate = (rowModel: GridRowModel) => {
        const newRow = Record.create({ ...rowModel });
        const oldRow = allMainTableRows.find((row) => row.id === newRow.id);

        const updatedRow = RecordRow.create({
            ...oldRow,
            ...newRow,
            isEdited: true,
        });

        setMainTableState((prev) => {
            prev.rows[newRow.id] = updatedRow;
            return { ...prev };
        });

        return updatedRow;
    };

    const handleRowModesChange = (newRowModes: GridRowModesModel) => {
        setRowModes(newRowModes as RecordRowModes);
    };

    const multiselectFilter = (filterItem: {
        field: string;
        operator: string;
        value?: EntityType | null;
    }) => {
        if (!filterItem.value) {
            return null;
        }

        return (value: EntityType[]) => {
            return value.some((cellValue) => cellValue === filterItem.value);
        };
    };

    const columns: DataGridColumn[] = [
        {
            field: "id",
            headerName: "ID",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => <IdCell row={row} />,
            editable: false,
            resizable: true,
        },
        {
            field: "entityType",
            headerName: "Entity",
            type: "singleSelect",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => <EntityCell row={row} />,
            editable: true,
            resizable: true,
            valueOptions: entityTypes,
            renderEditCell: EntityEditCell,
            filterOperators: [
                {
                    value: "isAnyOf",
                    getApplyFilterFn: multiselectFilter,
                    InputComponent: MultiSelectFilterInput,
                },
            ],
        },
        {
            field: "operatingStatus",
            headerName: "Operating status",
            type: "singleSelect",
            sortable: true,
            width: 170,
            renderCell: ({ row }) => <OperatingStatusCell row={row} />,
            editable: true,
            resizable: true,
            valueOptions: operatingStatuses,
        },
        {
            field: "legalName",
            headerName: "Legal name",
            type: "string",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <TextCell
                    field="legalName"
                    row={row}
                />
            ),
            editable: true,
            resizable: true,
        },
        {
            field: "dbaName",
            headerName: "DBA name",
            type: "string",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <TextCell
                    field="dbaName"
                    row={row}
                />
            ),
            editable: true,
            resizable: true,
        },
        {
            field: "physicalAddress",
            headerName: "Physical address",
            type: "string",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <TextCell
                    field="physicalAddress"
                    row={row}
                />
            ),
            editable: true,
            resizable: true,
        },
        {
            field: "phone",
            headerName: "Phone",
            type: "string",
            sortable: true,
            flex: 1,
            editable: true,
            resizable: true,
        },
        {
            field: "usdotNumber",
            headerName: "DOT",
            type: "number",
            sortable: true,
            flex: 1,
            editable: true,
            resizable: true,
        },
        {
            field: "mcMxFfNumber",
            headerName: "MC/MX/FF",
            type: "number",
            sortable: true,
            flex: 1,
            editable: true,
            resizable: true,
        },
        {
            field: "powerUnits",
            headerName: "Power units",
            type: "number",
            sortable: true,
            flex: 1,
            editable: true,
            resizable: true,
        },
        {
            field: "outOfServiceDate",
            headerName: "Out of service",
            type: "dateTime",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <DateCell
                    field="outOfServiceDate"
                    row={row}
                />
            ),
            editable: true,
            resizable: true,
        },
        {
            field: "dataSourceModifiedDt",
            headerName: "Last updated",
            type: "dateTime",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <DateCell
                    field="dataSourceModifiedDt"
                    row={row}
                />
            ),
            editable: true,
            resizable: true,
        },
        {
            field: "createdDt",
            headerName: "Created",
            type: "dateTime",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <DateCell
                    field="createdDt"
                    row={row}
                />
            ),
            editable: true,
            resizable: true,
        },
        {
            field: "actions",
            type: "actions",
            headerName: "Actions",
            flex: 1,
            getActions: (row: any) => ActionsCell({ row }),
        },
    ];

    const initialState = useMemo(
        () => ({ ...mainTableState }),
        [currentDashboard]
    );

    const rowModesModel = useMemo(() => {
        return Object.entries(rowModes).reduce((result, [id, mode]) => {
            const exists = !!allMainTableRows.find((row) => row.id === id);
            if (exists) {
                result[id] = mode;
            }
            return result;
        }, {} as GridRowModesModel);
    }, [allMainTableRows, rowModes]);

    return (
        <DataGridContainer
            key={String(isMobile)}
            apiRef={mainTableApi}
            editMode="row"
            rowSelection={false}
            rows={allMainTableRows}
            columns={columns}
            loading={loading}
            initialState={initialState}
            pageSizeOptions={[5, 10, 25, 50]}
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
                toolbar: EditToolbar as GridSlots["toolbar"],
            }}
        />
    );
}

export default TableDataGrid;
export { TableDataGrid };
export type { RecordRow };

function MultiSelectFilterInput(props: any) {
    const { item, applyValue, type, focusElementRef } = props;
    const { entityTypes } = useDataset();

    return (
        <TextField
            select
            inputRef={focusElementRef}
            label="Value"
            variant="standard"
            onChange={(evt) => {
                const value = evt.target.value;
                applyValue({ ...item, value });
            }}
            value={item.value}
            type={type || "text"}
            InputLabelProps={{
                shrink: true,
            }}
        >
            {entityTypes.map((option) => (
                <MenuItem
                    key={option}
                    value={option}
                >
                    {option}
                </MenuItem>
            ))}
        </TextField>
    );
}
