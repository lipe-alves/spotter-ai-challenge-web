import Record, { OperatingStatus } from "@models/Record";

interface GetOperatingStatusesArgs {
    allRecords: Record[];
}

function getOperatingStatuses(e: { data: GetOperatingStatusesArgs }): void {
    const { allRecords } = e.data;

    const operatingStatuses = allRecords.reduce((statuses, record) => {
        statuses = Array.from(
            new Set([...statuses, record.operatingStatus || "UNSPECIFIED"])
        );
        statuses = statuses.filter(Boolean);
        return statuses;
    }, [] as OperatingStatus[]);

    postMessage(operatingStatuses);
}

export default getOperatingStatuses;
export type { GetOperatingStatusesArgs };
