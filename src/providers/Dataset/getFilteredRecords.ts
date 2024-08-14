import Record, { RecordFilters } from "@models/Record";

interface GetFilteredRecordsArgs {
    allRecords: Record[];
    filters: RecordFilters;
}

function getFilteredRecords(e: { data: GetFilteredRecordsArgs }): void {
    const { allRecords, filters } = e.data;

    const recordStatus = filters.recordStatus;
    const search = filters.search || "";

    const filteredRecords = allRecords
        .filter((record) =>
            recordStatus === "unknown"
                ? !record.recordStatus
                : record.recordStatus === recordStatus
        )
        .filter((record) => {
            return JSON.stringify(record)
                .toLowerCase()
                .includes(search.toLowerCase());
        });

    postMessage(filteredRecords);
}

export default getFilteredRecords;
export type { GetFilteredRecordsArgs };
