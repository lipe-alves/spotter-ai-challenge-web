import RecordRow from "@models/RecordRow";
import { MainTableState } from "@models/DashboardSetup";

type MainTableRowsGeneratorArgs = {
    mainTableState: MainTableState;
    filteredRecordRows: RecordRow[];
};

function generateMainTableRows(e: { data: MainTableRowsGeneratorArgs }): void {
    const { mainTableState, filteredRecordRows } = e.data;

    const map = new Map<string, RecordRow>();

    const initialRows = [...filteredRecordRows];

    const rows = [...initialRows, ...Object.values(mainTableState.rows)];

    for (const row of rows) {
        map.set(row.id, row);
    }

    const mainTableRows = Array.from(map.values())
        .filter((row) => !row.isDeleted)
        .sort((a, b) => {
            const aInTableState = !!mainTableState.rows[a.id];
            const bInTableState = !!mainTableState.rows[b.id];
            if (aInTableState && bInTableState) return 0;
            if (aInTableState) return -1;
            return 1;
        });

    postMessage(mainTableRows);
}

export default generateMainTableRows;
export type { MainTableRowsGeneratorArgs };
