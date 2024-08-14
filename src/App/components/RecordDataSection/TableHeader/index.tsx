import { useEffect, useMemo } from "react";

import { useDataset } from "@providers";
import { useWindowSize } from "@hooks";

import { TableHeaderContainer, TableTabs, TableTab } from "./styles";

function TableHeader() {
    const { allRecords, filters, setFilters, recordStatuses } = useDataset();

    const [windowWidth] = useWindowSize();
    const isMobile = windowWidth <= 600;

    const selectedRecordStatusIndex = useMemo(() => {
        return Math.max(0, recordStatuses.indexOf(filters.recordStatus));
    }, [filters, recordStatuses]);

    const getRecordStatusCount = (recordStatus: string) => {
        return allRecords.filter((record) =>
            recordStatus === "unknown"
                ? !record.recordStatus
                : record.recordStatus === recordStatus
        ).length;
    };

    const changeRecordStatus = (index: number) => {
        const recordStatus = recordStatuses[index];

        setFilters((prev) => ({
            ...prev,
            recordStatus,
        }));
    };

    useEffect(() => {
        changeRecordStatus(0);
    }, [recordStatuses]);

    return (
        <TableHeaderContainer>
            <TableTabs
                onChange={(_, value) => changeRecordStatus(value)}
                value={selectedRecordStatusIndex}
            >
                {recordStatuses
                    .map((recordStatus) => [
                        recordStatus,
                        getRecordStatusCount(recordStatus),
                    ])
                    .map(([recordStatus, count], i) => (
                        <TableTab
                            key={recordStatus}
                            index={i}
                            isMobile={isMobile}
                            label={
                                <span>
                                    {recordStatus} (
                                    {count.toLocaleString("en-US")})
                                </span>
                            }
                        />
                    ))}
            </TableTabs>
        </TableHeaderContainer>
    );
}

export default TableHeader;
