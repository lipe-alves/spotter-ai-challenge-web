import { ChangeEvent, useEffect, useMemo } from "react";
import { TextField } from "@mui/material";

import { useDataset } from "@providers";
import { useWindowSize } from "@hooks";
import { ExportDropdown } from "@components";

import RecordDataGrid from "./RecordDataGrid";

import {
    TableHeader,
    TableTabs,
    TableTab,
    TableContainer,
    TableTools,
    FormContainer,
} from "./styles";

function RecordTable() {
    const { allRecords, filteredRecords, filters, setFilters, recordStatuses } =
        useDataset();

    const [windowWidth] = useWindowSize();
    const isMobile = windowWidth <= 600;

    const selectedRecordStatusIndex = useMemo(() => {
        return recordStatuses.indexOf(filters.recordStatus);
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

    const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
            ...prev,
            search: evt.target.value,
        }));
    };

    useEffect(() => {
        changeRecordStatus(0);
    }, [recordStatuses]);

    return (
        <>
            <TableHeader>
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
            </TableHeader>
            <TableContainer>
                <TableTools>
                    <FormContainer fullWidth={isMobile}>
                        <span>Search:</span>
                        <TextField
                            fullWidth={isMobile}
                            placeholder="Search for any field"
                            onChange={handleSearchChange}
                            value={filters.search}
                        />
                    </FormContainer>
                    <ExportDropdown data={filteredRecords} />
                </TableTools>
                <RecordDataGrid />
            </TableContainer>
        </>
    );
}

export default RecordTable;
export { RecordTable };
