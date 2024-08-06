import { useState } from "react";
import { ExportDropdown } from "@components";
import PivotDataGrid, { PivotDataGridRow } from "./PivotDataGrid";
import { TableContainer, TableTools } from "./styles";

function PivotTable() {
    const [rows, setRows] = useState<PivotDataGridRow[]>([]);

    const handleOnLoadRows = (rows: PivotDataGridRow[]) => {
        setRows(rows);
    };

    return (
        <TableContainer>
            <TableTools>
                <ExportDropdown data={rows} />
            </TableTools>
            <PivotDataGrid onRowsLoaded={handleOnLoadRows} />
        </TableContainer>
    );
}

export default PivotTable;
export { PivotTable };
