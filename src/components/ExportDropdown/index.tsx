import { useState, MouseEvent, useMemo } from "react";
import { MenuItem } from "@mui/material";

import { csv, downloadFile } from "@utils";
import { useWindowSize } from "@hooks";

import {
    FormContainer,
    ExportMenu,
    ExportButtonList,
    ExportButton,
} from "./styles";

import {
    FileOpenOutlined as ExportIcon,
    KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material";

interface ExportDropdownProps {
    data: any[];
    selectedFields?: string[];
}

function ExportDropdown(props: ExportDropdownProps) {
    let { data = [], selectedFields } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [copied, setCopied] = useState(false);
    const [windowWidth] = useWindowSize();

    const isMobile = windowWidth <= 600;
    const open = Boolean(anchorEl);

    const dataToExport = useMemo(() => {
        return data.map((item) => {
            const itemToExport: any = {};

            if (!selectedFields) {
                selectedFields = Object.keys(item);
            }

            for (const key of selectedFields) {
                itemToExport[key] = item[key];
            }

            return itemToExport;
        });
    }, [data, selectedFields]);

    const handleOpenExportMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseExportMenu = () => {
        setAnchorEl(null);
    };

    const handleExportAsExcel = async () => {
        const buffer = csv.convertToXlsx(dataToExport, "Report");
        const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        downloadFile(blob, "report.xlsx");
    };

    const handleExportAsCsv = async () => {
        const csvStr = csv.convertToCsv(dataToExport);
        const blob = new Blob([csvStr], { type: "text/csv" });
        downloadFile(blob, "report.csv");
    };

    const handleCopyCsv = async () => {
        const csvStr = csv.convertToCsv(dataToExport);
        await navigator.clipboard.writeText(csvStr);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return !isMobile ? (
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
                <MenuItem onClick={handleExportAsCsv}>CSV</MenuItem>
                <MenuItem onClick={handleExportAsExcel}>Excel</MenuItem>
                <MenuItem onClick={handleCopyCsv}>
                    {!copied ? "Copy" : "Copied!"}
                </MenuItem>
            </ExportMenu>
        </>
    ) : (
        <FormContainer fullWidth={isMobile}>
            <span>Export as:</span>
            <ExportButtonList>
                <ExportButton onClick={handleExportAsCsv}>CSV</ExportButton>
                <ExportButton onClick={handleExportAsExcel}>Excel</ExportButton>
                <ExportButton onClick={handleCopyCsv}>
                    {!copied ? "Copy" : "Copied!"}
                </ExportButton>
            </ExportButtonList>
        </FormContainer>
    );
}

export default ExportDropdown;
export { ExportDropdown };
