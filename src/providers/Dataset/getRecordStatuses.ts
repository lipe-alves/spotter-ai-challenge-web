import Record, { RecordStatus } from "@models/Record";

interface GetRecordStatusesArgs {
    allRecords: Record[];
}

function getRecordStatuses(e: { data: GetRecordStatusesArgs }): void {
    const { allRecords } = e.data;

    const recordStatuses = allRecords.reduce((statuses, record) => {
        statuses = Array.from(
            new Set([...statuses, record.recordStatus || "unknown"])
        );
        return statuses;
    }, [] as RecordStatus[]);

    postMessage(recordStatuses);
}

export default getRecordStatuses;
export type { GetRecordStatusesArgs };
