import { ChangeEvent, useEffect } from "react";
import { TextField } from "@mui/material";

import Record from "@models/Record";
import { useTables, useDataset } from "@providers";
import { useWindowSize } from "@hooks";
import { ExportDropdown } from "@components";

import { TableToolsContainer, ToolsSection } from "./styles";

function TableTools() {
    const { filters, setFilters, recordStatuses } = useDataset();
    const { filteredAndSortedMainTableRows } = useTables();

    const [windowWidth] = useWindowSize();
    const isMobile = windowWidth <= 600;

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
        <TableToolsContainer>
            <ToolsSection fullWidth={isMobile}>
                <label>Search:</label>
                <TextField
                    fullWidth={isMobile}
                    placeholder="Search for any field"
                    onChange={handleSearchChange}
                    value={filters.search}
                />
            </ToolsSection>
            <ExportDropdown
                data={filteredAndSortedMainTableRows}
                selectedFields={Record.keys()}
            />
        </TableToolsContainer>
    );
}

export default TableTools;
