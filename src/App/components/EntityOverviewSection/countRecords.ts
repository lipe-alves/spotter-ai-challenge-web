import { EntityType } from "@models/Record";
import RecordRow from "@models/RecordRow";
import { TimeItem } from "./index";

type CountRecordsArgs = {
    month: number;
    year: number;
    weekList: TimeItem[];
    monthList: TimeItem[];
    yearList: TimeItem[];
    entityTypes: EntityType[];
    filteredAndSortedMainTableRows: RecordRow[];
};

function countRecords(e: { data: CountRecordsArgs }): void {
    const {
        month,
        year,
        entityTypes,
        yearList,
        monthList,
        weekList,
        filteredAndSortedMainTableRows,
    } = e.data;
    const rows: any[] = [];

    for (const entityType of entityTypes) {
        {
            const row: any = {
                id: String(Math.round(Math.random() * 1000)),
                entityType,
            };
            for (const year of yearList) {
                row[year.label] = getCountOfRowsInTime(entityType, year);
            }
            rows.push(row);
        }
        {
            const row: any = {
                id: String(Math.round(Math.random() * 1000)),
                entityType,
            };
            for (const month of monthList) {
                row[month.label] = getCountOfRowsInTime(entityType, month);
            }
            rows.push(row);
        }
        {
            const row: any = {
                id: String(Math.round(Math.random() * 1000)),
                entityType,
            };
            for (const week of weekList) {
                row[week.label] = getCountOfRowsInTime(entityType, week);
            }
            rows.push(row);
        }
    }

    postMessage(rows);

    function getWeekOfMonth(date: Date): number {
        const firstDayOfMonth = new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        );
        const firstDayOfWeek = new Date(
            date.setDate(date.getDate() - date.getDay())
        );
        const weekNumber = Math.ceil(
            ((firstDayOfWeek.getTime() - firstDayOfMonth.getTime()) / 86400000 +
                date.getDay() +
                1) /
                7
        );
        return weekNumber;
    }

    function getCountOfRowsInTime(
        entityType: EntityType,
        timeItem: TimeItem
    ): number {
        return filteredAndSortedMainTableRows
            .filter((row) => row.entityType.includes(entityType))
            .filter((row) => {
                const createdAt = row.createdDt;

                const isYear = !!yearList.find(
                    (year) => year.label === timeItem.label
                );
                const isMonth = !!monthList.find(
                    (month) => month.label === timeItem.label
                );
                const isWeek = !!weekList.find(
                    (week) => week.label === timeItem.label
                );

                if (isYear) {
                    return timeItem.value === createdAt.getFullYear();
                } else if (isMonth) {
                    return (
                        timeItem.value === createdAt.getMonth() &&
                        createdAt.getFullYear() === year
                    );
                } else if (isWeek) {
                    const weekNumber = getWeekOfMonth(createdAt);
                    return (
                        weekNumber === timeItem.value &&
                        createdAt.getMonth() === month &&
                        createdAt.getFullYear() === year
                    );
                } else {
                    return false;
                }
            }).length;
    }
}

export default countRecords;
export type { CountRecordsArgs };
