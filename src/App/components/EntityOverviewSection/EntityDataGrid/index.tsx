import { useMemo, ChangeEvent } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, TextField } from "@mui/material";

import { ExportDropdown } from "@components";
import { useTables, useSetup } from "@providers";
import { DataGridColumn, TimeGroup } from "@types";

import {
    EntityDataGridContainer,
    EntityDataGridDateFilters,
    EntityDataGridHeader,
} from "./styles";

import { TimeItem } from "../index";

const timeOptions = ["week", "month", "year"] as const;

interface EntityDataGridProps {
    rows: any[];
    columns: DataGridColumn[];
    yearList: TimeItem[];
    monthList: TimeItem[];
}

function EntityDataGrid(props: EntityDataGridProps) {
    const { rows, columns, monthList, yearList } = props;

    const { currentDashboard } = useSetup();
    const { pivotTableApi, pivotTableState, setPivotTableState } = useTables();

    const { groupBy: timeGroup, month, year } = pivotTableState;

    const initialState = useMemo(
        () => ({ ...pivotTableState }),
        [currentDashboard]
    );

    const handleTimeFilterChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const timeGroup = evt.target.value as TimeGroup;
        setPivotTableState((prev) => ({
            ...prev,
            groupBy: timeGroup,
        }));
    };

    const handleMonthChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const month = Number(evt.target.value);
        setPivotTableState((prev) => ({
            ...prev,
            month,
        }));
    };

    const handleYearChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const year = Number(evt.target.value);
        setPivotTableState((prev) => ({
            ...prev,
            year,
        }));
    };

    return (
        <EntityDataGridContainer>
            <EntityDataGridHeader>
                <EntityDataGridDateFilters>
                    <TextField
                        select
                        label="Group by"
                        onChange={handleTimeFilterChange}
                        value={timeGroup}
                    >
                        {timeOptions.map((time) => (
                            <MenuItem
                                key={time}
                                value={time}
                            >
                                {time}
                            </MenuItem>
                        ))}
                    </TextField>
                    {timeGroup === "week" && (
                        <TextField
                            select
                            label="Month"
                            onChange={handleMonthChange}
                            value={month}
                        >
                            {monthList.map((month) => (
                                <MenuItem
                                    key={month.label}
                                    value={month.value}
                                >
                                    {month.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                    {(timeGroup === "week" || timeGroup === "month") && (
                        <TextField
                            select
                            label="Year"
                            onChange={handleYearChange}
                            value={year}
                        >
                            {yearList.map((year) => (
                                <MenuItem
                                    key={year.label}
                                    value={year.value}
                                >
                                    {year.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                </EntityDataGridDateFilters>

                <ExportDropdown data={rows} />
            </EntityDataGridHeader>
            <DataGrid
                apiRef={pivotTableApi}
                rows={rows}
                columns={columns}
                initialState={initialState}
                sx={{ width: "100%" }}
            />
        </EntityDataGridContainer>
    );
}

export default EntityDataGrid;
