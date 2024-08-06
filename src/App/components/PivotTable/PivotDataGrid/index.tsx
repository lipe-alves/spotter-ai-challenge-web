import { useMemo, useEffect } from "react";
import { EntityType, RecordStatus } from "@models/Record";
import { useDataset } from "@providers";
import { DataGridColumn } from "@types";
import { useWindowSize } from "@hooks";
import { DataGridContainer } from "./styles";

type PivotDataGridRowBase = {
    id: string;
    entityType: EntityType;
    total: number;
};

type PivotDataGridRowStatuses = {
    [status in RecordStatus]?: number;
};

type PivotDataGridRow = PivotDataGridRowBase & PivotDataGridRowStatuses;

interface PivotDataGridProps {
    onRowsLoaded: (rows: PivotDataGridRow[]) => void;
}

function PivotDataGrid(props: PivotDataGridProps) {
    const { loading, allRecords, recordStatuses, entityTypes } = useDataset();
    const { onRowsLoaded } = props;
    const [windowWidth] = useWindowSize();
    const isMobile = windowWidth <= 600;

    const columns: DataGridColumn[] = [
        {
            field: "entityType",
            headerName: "Entity",
            sortable: true,
            flex: 1,
        },
        ...recordStatuses.map((recordStatus) => ({
            field: recordStatus,
            headerName: recordStatus,
            sortable: true,
            flex: 1,
            valueFormatter: (value: number) => value.toLocaleString("en-US"),
        })),
        {
            field: "total",
            headerName: "TOTAL",
            sortable: true,
            flex: 1,
            valueFormatter: (value: number) => value.toLocaleString("en-US"),
        },
    ];

    const rows = entityTypes.map((entityType) => {
        const entityRecords = allRecords.filter((record) =>
            record.entityType.includes(entityType)
        );
        const total = entityRecords.length;

        const row: PivotDataGridRow = {
            id: entityType,
            entityType,
            total,
        };

        for (const recordStatus of recordStatuses) {
            const recordStatusRecords = entityRecords.filter((record) =>
                record.recordStatus
                    ? record.recordStatus === recordStatus
                    : recordStatus === "unknown"
            );

            row[recordStatus] = recordStatusRecords.length;
        }

        return row;
    });

    const initialState = useMemo(() => {
        const state: any = {
            columns: {
                columnVisibilityModel: {
                    entityType: true,
                    total: true,
                },
            },
        };

        for (const recordStatus of recordStatuses) {
            state.columns.columnVisibilityModel[recordStatus] = !isMobile;
        }

        return state;
    }, [recordStatuses, isMobile]);

    useEffect(() => {
        if (rows.length > 0) {
            onRowsLoaded(rows);
        }
    }, [rows.length]);

    return (
        <DataGridContainer
            key={String(isMobile)}
            rowSelection={false}
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={initialState}
        />
    );
}

export default PivotDataGrid;
export { PivotDataGrid };
export type {
    PivotDataGridRow,
    PivotDataGridRowStatuses,
    PivotDataGridRowBase,
    PivotDataGridProps,
};
