import { useState, useMemo } from "react";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { EntityType } from "@models/Record";
import { useTables, useDataset } from "@providers";
import { getMonthName } from "@utils";

import {
    OutOfServiceContainer,
    BarChartContainer,
    OutOfServiceBarChart,
    OutOfServicePieChart,
    BarChartDateFilters,
} from "./styles";

const today = new Date();

const defaultMaxDate = new Date(today.getFullYear(), today.getMonth(), 1);
const defaultMinDate = new Date(defaultMaxDate);
defaultMinDate.setMonth(defaultMinDate.getMonth() - 12);

interface TimeScale {
    label: string;
    date: Date;
}

function OutOfServiceSection() {
    const { entityTypes } = useDataset();
    const { filteredAndSortedMainTableRows } = useTables();

    const [minDate, setMinDate] = useState<Date>(defaultMinDate);
    const [maxDate, setMaxDate] = useState<Date>(defaultMaxDate);

    const getOutOfServiceCountPerMonth = (timeScale: TimeScale) => {
        const { date } = timeScale;
        const timeIndex = date.getMonth();
        const year = date.getFullYear();

        return outOfServiceRows.filter(
            (row) =>
                row.outOfServiceDate.getMonth() === timeIndex &&
                row.outOfServiceDate.getFullYear() === year
        ).length;
    };

    const getOutOfServiceCountPerEntity = (entity: EntityType) => {
        return outOfServiceRows.filter((row) => row.entityType.includes(entity))
            .length;
    };

    const handleMinDateChange = (minDate: Dayjs | null) => {
        if (!minDate) return;
        setMinDate(minDate.toDate());
    };

    const handleMaxDateChange = (maxDate: Dayjs | null) => {
        if (!maxDate) return;
        setMaxDate(maxDate.toDate());
    };

    const timeScales = useMemo(() => {
        const scales: TimeScale[] = [];
        let date = new Date(minDate.getTime());
        let count = 0;
        const maxTime = maxDate.getTime();

        do {
            const timeName = getMonthName(date.getMonth() + 1);
            const year = date.getFullYear();

            scales.push({
                date: new Date(date.getTime()),
                label: `${timeName}/${year}`,
            });

            date.setMonth(date.getMonth() + 1);
            count++;
        } while (date.getTime() <= maxTime && count < 12);

        return scales;
    }, [minDate, maxDate]);

    const maxMaxDate = useMemo(() => {
        const date = new Date(minDate.getTime());
        date.setFullYear(date.getFullYear() + 1);
        return date;
    }, [minDate]);

    const minMinDate = useMemo(() => {
        const date = new Date(maxDate.getTime());
        date.setFullYear(date.getFullYear() - 1);
        return date;
    }, [maxDate]);

    const outOfServiceRows = useMemo(() => {
        return filteredAndSortedMainTableRows
            .filter((row) => !!row.outOfServiceDate)
            .filter((row) => {
                const outOfServiceTime = row.outOfServiceDate.getTime();
                const minTime = minDate.getTime();
                const maxTime = maxDate.getTime();

                return (
                    outOfServiceTime >= minTime && outOfServiceTime <= maxTime
                );
            });
    }, [filteredAndSortedMainTableRows, minDate, maxDate]);

    const series = useMemo(
        () =>
            timeScales.map(({ label }) => ({
                label,
                dataKey: label,
            })),
        [timeScales]
    );

    const dataset = useMemo(() => {
        return timeScales.map((timeScale) => {
            const count = getOutOfServiceCountPerMonth(timeScale);
            return {
                [timeScale.label]: count,
                time: timeScale.label,
            };
        });
    }, [timeScales, outOfServiceRows]);

    const barChartProps = useMemo(
        () => ({
            dataset,
            series,
            yAxis: [
                {
                    label: "Companies out of service",
                },
            ],
            xAxis: [
                {
                    scaleType: "band" as const,
                    dataKey: "time",
                },
            ],
            height: 400,
            borderRadius: 16,
        }),
        [dataset, series]
    );

    const pieChartProps = useMemo(
        () => ({
            series: [
                {
                    data: entityTypes.map((entity) => ({
                        id: entity,
                        label: entity,
                        value: getOutOfServiceCountPerEntity(entity),
                    })),
                    highlightScope: {
                        faded: "global" as const,
                        highlighted: "item" as const,
                    },
                    faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                    },
                },
            ],
            height: 400,
        }),
        [entityTypes, outOfServiceRows]
    );

    return (
        <OutOfServiceContainer>
            <BarChartContainer>
                <BarChartDateFilters>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                        >
                            <DatePicker
                                label="Min date"
                                onChange={handleMinDateChange}
                                value={dayjs(minDate)}
                                maxDate={dayjs(maxDate)}
                                minDate={dayjs(minMinDate)}
                            />
                            <DatePicker
                                label="Max date"
                                onChange={handleMaxDateChange}
                                value={dayjs(maxDate)}
                                minDate={dayjs(minDate)}
                                maxDate={dayjs(maxMaxDate)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </BarChartDateFilters>
                <OutOfServiceBarChart {...barChartProps} />
            </BarChartContainer>
            <OutOfServicePieChart {...pieChartProps} />
        </OutOfServiceContainer>
    );
}

export default OutOfServiceSection;
export { OutOfServiceSection };
