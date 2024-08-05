import { ChangeEvent, useState, useEffect, useMemo, MouseEvent } from "react";
import { MenuItem, TextField } from "@mui/material";

import { useDataset } from "@providers";
import { csv, downloadFile } from "@utils";
import { useWindowSize } from "@hooks";
import DataTable from "../DataTable";
import {
    DashboardRoot,
    DashboardHeader,
    DashboardTabs,
    DashboardTab,
    DashboardContainer,
    DashboardTools,
    FormContainer,
    ExportButton,
    ExportMenu,
    ExportButtonList,
} from "./styles";

import {
    FileOpenOutlined as ExportIcon,
    KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";

function Dashboard() {
    const { allRecords, filteredRecords, filters, setFilters } = useDataset();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [copied, setCopied] = useState(false);
    const [windowWidth] = useWindowSize();

    const isMobile = windowWidth <= 600;
    const open = Boolean(anchorEl);

    const handleOpenExportMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseExportMenu = () => {
        setAnchorEl(null);
    };

    const recordStatuses = useMemo(() => {
        return allRecords.reduce((statuses, record) => {
            statuses = Array.from(
                new Set([...statuses, record.recordStatus || "Unknown"])
            );
            return statuses;
        }, [] as string[]);
    }, [allRecords]);

    const selectedRecordStatusIndex = useMemo(() => {
        return recordStatuses.indexOf(filters.recordStatus);
    }, [filters, recordStatuses]);

    const getRecordStatusCount = (recordStatus: string) => {
        return allRecords.filter((record) =>
            recordStatus === "Unknown"
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

    const handleExportAsExcel = async () => {
        const buffer = csv.convertToXlsx(filteredRecords, "Report");
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        downloadFile(blob, "report.xlsx");
    };

    const handleExportAsCsv = async () => {
        const csvStr = csv.convertToCsv(filteredRecords);
        const blob = new Blob([csvStr], { type: "text/csv" });
        downloadFile(blob, "report.csv");
    };

    const handleCopyCsv = async () => {
        const csvStr = csv.convertToCsv(filteredRecords);
        await navigator.clipboard.writeText(csvStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    useEffect(() => {
        changeRecordStatus(0);
    }, [recordStatuses]);

    return (
        <DashboardRoot>
            <DashboardHeader>
                <DashboardTabs
                    onChange={(_, value) => changeRecordStatus(value)}
                    value={selectedRecordStatusIndex}
                >
                    {recordStatuses.map((recordStatus, i) => (
                        <DashboardTab
                            key={recordStatus}
                            index={i}
                            isMobile={isMobile}
                            label={
                                <span>
                                    {recordStatus} (
                                    {getRecordStatusCount(recordStatus)})
                                </span>
                            }
                        />
                    ))}
                </DashboardTabs>
            </DashboardHeader>
            <DashboardContainer>
                <DashboardTools>
                    <FormContainer fullWidth={isMobile}>
                        <span>Search:</span>
                        <TextField
                            fullWidth={isMobile}
                            placeholder="Search for any field"
                            onChange={handleSearchChange}
                            value={filters.search}
                        />
                    </FormContainer>
                    {!isMobile ? (
                        <>
                            <ExportButton
                                onClick={handleOpenExportMenu}
                                startIcon={<ExportIcon />}
                                endIcon={<ArrowDownIcon />}
                            >
                                Export
                            </ExportButton>
                            <ExportMenu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleCloseExportMenu}
                            >
                                <MenuItem onClick={handleExportAsCsv}>
                                    CSV
                                </MenuItem>
                                <MenuItem onClick={handleExportAsExcel}>
                                    Excel
                                </MenuItem>
                                <MenuItem onClick={handleCopyCsv}>
                                    {!copied ? "Copy" : "Copied!"}
                                </MenuItem>
                            </ExportMenu>
                        </>
                    ) : (
                        <FormContainer fullWidth={isMobile}>
                            <span>Export as:</span>
                            <ExportButtonList>
                                <ExportButton onClick={handleExportAsCsv}>
                                    CSV
                                </ExportButton>
                                <ExportButton onClick={handleExportAsExcel}>
                                    Excel
                                </ExportButton>
                                <ExportButton onClick={handleCopyCsv}>
                                    {!copied ? "Copy" : "Copied!"}
                                </ExportButton>
                            </ExportButtonList>
                        </FormContainer>
                    )}
                </DashboardTools>
                <DataTable />
            </DashboardContainer>
        </DashboardRoot>
    );
}

export default Dashboard;
export { Dashboard };
