import { useMemo, ChangeEvent } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, TextField } from "@mui/material";

import { ExportDropdown } from "@components";
import { useTables, useSetup } from "@providers";
import { DataGridColumn } from "@types";

import { TimeItem } from "../index";

import { EntityOverviewLineChart } from "./styles";

interface EntityLineChartProps {
    rows: any[];
    columns: DataGridColumn[];
    yearList: TimeItem[];
    monthList: TimeItem[];
    weekList: TimeItem[];
}

function EntityLineChart(props: EntityLineChartProps) {
    const { rows, columns, yearList, monthList, weekList } = props;

    const { currentDashboard } = useSetup();
    const { pivotTableApi, pivotTableState, setPivotTableState } = useTables();

    const { groupBy: timeGroup, month, year } = pivotTableState;

    const timeScales = useMemo(() => {
        if (timeGroup === "year") return yearList;
        if (timeGroup === "month") return monthList;
        if (timeGroup === "week") return weekList;
        return [];
    }, [yearList, monthList, weekList, timeGroup]);

    const xAxis = useMemo(() => {
        return [
            {
                scaleType: "band" as const,
                data: timeScales.map((timeScale) => timeScale.label),
            },
        ];
    }, [timeScales]);

    const series = useMemo(() => {
        return [
            {
                data: timeScales.map((timeScale) => {
                    const count = rows
                        .filter((row) => row[timeScale.label] !== undefined)
                        .reduce((sum, row) => sum + row[timeScale.label], 0);

                    return count;
                }),
            },
        ];
    }, [rows, timeScales]);

    return (
        <EntityOverviewLineChart
            xAxis={xAxis}
            series={series}
            height={400}
        />
    );
}

export default EntityLineChart;
export { EntityLineChart };
