import { useDataset } from "@providers";
import { useWindowSize } from "@hooks";
import { DataGridColumn } from "@types";
import {
    DateCell,
    IdCell,
    OperatingStatusCell,
    TextCell,
    EntityCell,
} from "./cells";
import { DataGridContainer } from "./styles";

function RecordDataGrid() {
    const { loading, filteredRecords, filters } = useDataset();
    const [windowWidth] = useWindowSize();
    const isMobile = windowWidth <= 600;

    const rows = filteredRecords
        .map((record) => ({
            ...record,
            operatingStatus: record.operatingStatus || "UNSPECIFIED",
            legalName: record.legalName || "-",
            dbaName: record.dbaName || "-",
        }))
        .filter((record) => {
            if (!filters.recordStatus) return true;
            if (filters.recordStatus === "unknown") return !record.recordStatus;
            return record.recordStatus === filters.recordStatus;
        });

    const columns: DataGridColumn[] = [
        {
            field: "id",
            headerName: "ID",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => <IdCell row={row} />,
        },
        {
            field: "entityType",
            headerName: "Entity",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => <EntityCell row={row} />,
        },
        {
            field: "operatingStatus",
            headerName: "Operating status",
            sortable: true,
            width: 170,
            renderCell: ({ row }) => <OperatingStatusCell row={row} />,
        },
        {
            field: "legalName",
            headerName: "Legal name",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <TextCell
                    field="legalName"
                    row={row}
                />
            ),
        },
        {
            field: "dbaName",
            headerName: "DBA name",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <TextCell
                    field="dbaName"
                    row={row}
                />
            ),
        },
        {
            field: "physicalAddress",
            headerName: "Physical address",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <TextCell
                    field="physicalAddress"
                    row={row}
                />
            ),
        },
        {
            field: "phone",
            headerName: "Phone",
            sortable: true,
            flex: 1,
        },
        {
            field: "usdotNumber",
            headerName: "DOT",
            sortable: true,
            flex: 1,
        },
        {
            field: "mcMxFfNumber",
            headerName: "MC/MX/FF",
            sortable: true,
            flex: 1,
        },
        {
            field: "powerUnits",
            headerName: "Power units",
            sortable: true,
            flex: 1,
        },
        {
            field: "outOfServiceDate",
            headerName: "Out of service",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <DateCell
                    field="outOfServiceDate"
                    row={row}
                />
            ),
        },
        {
            field: "dataSourceModifiedDt",
            headerName: "Last updated",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <DateCell
                    field="dataSourceModifiedDt"
                    row={row}
                />
            ),
        },
        {
            field: "createdDt",
            headerName: "Created",
            sortable: true,
            flex: 1,
            renderCell: ({ row }) => (
                <DateCell
                    field="createdDt"
                    row={row}
                />
            ),
        },
    ];

    const initialState = {
        pagination: {
            paginationModel: {
                pageSize: 5,
            },
        },
        columns: {
            columnVisibilityModel: {
                id: !isMobile,
                entityType: true,
                operatingStatus: true,
                legalName: true,
                dbaName: !isMobile,
                physicalAddress: !isMobile,
                phone: !isMobile,
                usdotNumber: !isMobile,
                mcMxFfNumber: !isMobile,
                powerUnits: !isMobile,
                outOfServiceDate: !isMobile,
                dataSourceModifiedDt: !isMobile,
                createdDt: !isMobile,
            },
        },
    };

    return (
        <DataGridContainer
            key={String(isMobile)}
            rowSelection={false}
            rows={rows}
            columns={columns}
            loading={loading}
            initialState={initialState}
            pageSizeOptions={[5, 10, 25, 50]}
        />
    );
}

export default RecordDataGrid;
export { RecordDataGrid };
