import {
    createContext,
    useContext,
    useState,
    useMemo,
    Dispatch,
    SetStateAction,
} from "react";

import { ContextProviderProps } from "@types";
import { useAsyncEffect } from "@hooks";
import { csv } from "@utils";
import { Record, RecordStatus, EntityType, OperatingStatus } from "@models";

import fmscaRecordsUrl from "@assets/data/FMSCA_records.csv";

interface RecordFilters {
    [field: string]: any;
}

interface DatasetValue {
    loading: boolean;
    allRecords: Record[];
    filteredRecords: Record[];
    filters: RecordFilters;
    setFilters: Dispatch<SetStateAction<RecordFilters>>;
    recordStatuses: RecordStatus[];
    entityTypes: EntityType[];
    operatingStatuses: OperatingStatus[];
    states: string[];
}

const DatasetContext = createContext<DatasetValue | undefined>(undefined);

function DatasetProvider(props: ContextProviderProps) {
    const { children } = props;
    const [loading, setLoading] = useState(true);
    const [allRecords, setAllRecords] = useState<Record[]>([]);
    const [filters, setFilters] = useState<RecordFilters>({});

    const toCamelCase = (str: string): string => {
        return str
            .split("_")
            .map((word, i) => {
                if (i === 0) return word;
                return word[0].toUpperCase() + word.slice(1);
            })
            .join("");
    };

    const replaceKeys = (key: string): string => {
        return toCamelCase(key || "");
    };

    const replaceValues = (key: string, value: string): any => {
        if (key === "entityType") return value.split("/");
        if (value === "NULL") return null;
        return value;
    };

    const recordStatuses = useMemo(() => {
        return allRecords.reduce((statuses, record) => {
            statuses = Array.from(
                new Set([...statuses, record.recordStatus || "unknown"])
            );
            return statuses;
        }, [] as RecordStatus[]);
    }, [allRecords]);

    const entityTypes = useMemo(() => {
        return allRecords.reduce((entities, record) => {
            entities = Array.from(new Set([...entities, ...record.entityType]));
            entities = entities.filter(Boolean);
            return entities;
        }, [] as EntityType[]);
    }, [allRecords]);

    const operatingStatuses = useMemo(() => {
        return allRecords.reduce((statuses, record) => {
            statuses = Array.from(
                new Set([...statuses, record.operatingStatus || "UNSPECIFIED"])
            );
            statuses = statuses.filter(Boolean);
            return statuses;
        }, [] as OperatingStatus[]);
    }, [allRecords]);

    const states = useMemo(() => {
        return allRecords.reduce((states, record) => {
            states = Array.from(new Set([...states, record.pState]));
            return states;
        }, [] as string[]);
    }, [allRecords]);

    const filteredRecords = useMemo(() => {
        const recordStatus = filters.recordStatus;
        const search = filters.search || "";

        return allRecords
            .filter((record) =>
                recordStatus === "unknown"
                    ? !record.recordStatus
                    : record.recordStatus === recordStatus
            )
            .filter((record) => {
                return JSON.stringify(record)
                    .toLowerCase()
                    .includes(search.toLowerCase());
            });
    }, [allRecords, filters]);

    useAsyncEffect(async () => {
        setLoading(true);

        const response = await fetch(fmscaRecordsUrl);
        const csvStr = await response.text();
        const dataList = csv.parseCsv(csvStr, {
            keyReplacer: replaceKeys,
            valueReplacer: replaceValues,
        });
        const allRecords = dataList.map(Record.create);
        setAllRecords(allRecords);

        setLoading(false);
    }, []);

    return (
        <DatasetContext.Provider
            value={{
                loading,
                allRecords,
                filteredRecords,
                filters,
                setFilters,
                recordStatuses,
                entityTypes,
                operatingStatuses,
                states,
            }}
        >
            {children}
        </DatasetContext.Provider>
    );
}

function useDataset() {
    const context = useContext(DatasetContext);

    if (!context) {
        throw new Error("useDataset must be used within a DatasetProvider!");
    }

    return context;
}

export { DatasetContext, DatasetProvider, useDataset };
export type { DatasetValue };
