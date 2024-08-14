import { useEffect, useMemo } from "react";

import { useWorker } from "@hooks";
import { useTables, useDataset } from "@providers";
import { DataGridColumn } from "@types";
import { getMonthName, getTotalWeeksInMonth } from "@utils";

import EntityDataGrid from "./EntityDataGrid";
import EntityLineChart from "./EntityLineChart";

import { EntityOverviewContainer } from "./styles";

import countRecordsWorker, { CountRecordsArgs } from "./countRecords";

interface TimeItem {
    label: string;
    value: number;
}

function EntityOverviewSection() {
    const { entityTypes } = useDataset();
    const { filteredAndSortedMainTableRows, pivotTableState } = useTables();

    const { groupBy: timeGroup, month, year } = pivotTableState;

    const { result: allRowsPerTime = [], postMessage: countRecordsPerTime } =
        useWorker<any[], CountRecordsArgs>(countRecordsWorker);

    const monthList = useMemo(() => {
        const monthList: {
            label: string;
            value: number;
        }[] = [];

        for (let i = 1; i <= 12; i++) {
            const monthName = getMonthName(i);
            monthList.push({
                label: monthName,
                value: i - 1,
            });
        }

        return monthList;
    }, []);

    const yearList = useMemo(() => {
        const today = new Date();
        const currYear = today.getFullYear();
        const yearList: {
            label: string;
            value: number;
        }[] = [];

        for (let y = currYear - 6; y <= currYear; y++) {
            yearList.push({
                label: String(y),
                value: y,
            });
        }

        return yearList;
    }, []);

    const weekList = useMemo(() => {
        const weekList: {
            label: string;
            value: number;
        }[] = [];

        const totalWeeks = getTotalWeeksInMonth(month, year);

        for (let i = 1; i <= totalWeeks; i++) {
            weekList.push({
                label: `Week ${i}`,
                value: i - 1,
            });
        }

        return weekList;
    }, [month, year]);

    const columns: DataGridColumn[] = useMemo(() => {
        const columns: DataGridColumn[] = [
            {
                field: "entityType",
                headerName: "Entity Type",
                width: 150,
            },
        ];

        if (timeGroup === "week") {
            for (const weekday of weekList) {
                columns.push({
                    field: weekday.label,
                    headerName: weekday.label,
                    width: 150,
                });
            }
        } else if (timeGroup === "month") {
            for (const month of monthList) {
                columns.push({
                    field: month.label,
                    headerName: month.label,
                    width: 150,
                });
            }
        } else {
            for (const year of yearList) {
                columns.push({
                    field: year.label,
                    headerName: year.label,
                    width: 150,
                });
            }
        }

        return columns;
    }, [timeGroup, monthList, weekList, yearList]);

    const rows = useMemo(() => {
        return allRowsPerTime.filter((row) =>
            columns.every((column) => row[column.field] !== undefined)
        );
    }, [allRowsPerTime, columns]);

    useEffect(() => {
        countRecordsPerTime({
            month,
            year,
            weekList,
            monthList,
            yearList,
            entityTypes,
            filteredAndSortedMainTableRows,
        });
    }, [
        month,
        year,
        weekList,
        monthList,
        yearList,
        entityTypes,
        filteredAndSortedMainTableRows,
    ]);

    return (
        <EntityOverviewContainer>
            <EntityLineChart
                rows={rows}
                columns={columns}
                weekList={weekList}
                monthList={monthList}
                yearList={yearList}
            />
            <EntityDataGrid
                rows={rows}
                columns={columns}
                monthList={monthList}
                yearList={yearList}
            />
        </EntityOverviewContainer>
    );
}

export default EntityOverviewSection;
export { EntityOverviewSection };
export type { TimeItem };
