import {
    createContext,
    useContext,
    useState,
    useMemo,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";

import { ContextProviderProps } from "@types";
import { useAsyncEffect, useWorker } from "@hooks";
import { csv } from "@utils";
import Record, {
    RecordStatus,
    EntityType,
    OperatingStatus,
    RecordFilters,
} from "@models/Record";

import { useSetup } from "../Setup";
import { useToast } from "../Toast";
import { useLoader } from "../Loader";

import fmscaRecordsUrl from "@assets/data/FMSCA_records.csv";

import getRecordStatusesWorker, {
    GetRecordStatusesArgs,
} from "./getRecordStatuses";
import getEntityTypesWorker, { GetEntityTypesArgs } from "./getEntityTypes";
import getOperatingStatusesWorker, {
    GetOperatingStatusesArgs,
} from "./getOperatingStatuses";
import getStatesWorker, { GetStatesArgs } from "./getStates";
import getFilteredRecordsWorker, {
    GetFilteredRecordsArgs,
} from "./getFilteredRecords";

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

    const { currentDashboard } = useSetup();
    const toast = useToast();
    const loader = useLoader();

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

    const { result: recordStatuses = [], postMessage: getRecordStatuses } =
        useWorker<RecordStatus[], GetRecordStatusesArgs>(
            getRecordStatusesWorker
        );

    const { result: entityTypes = [], postMessage: getEntityTypes } = useWorker<
        EntityType[],
        GetEntityTypesArgs
    >(getEntityTypesWorker);

    const {
        result: operatingStatuses = [],
        postMessage: getOperatingStatuses,
    } = useWorker<OperatingStatus[], GetOperatingStatusesArgs>(
        getOperatingStatusesWorker
    );

    const { result: states = [], postMessage: getStates } = useWorker<
        EntityType[],
        GetStatesArgs
    >(getStatesWorker);

    const { result: filteredRecords = [], postMessage: getFilteredRecords } =
        useWorker<Record[], GetFilteredRecordsArgs>(getFilteredRecordsWorker);

    useAsyncEffect(async () => {
        try {
            loader.show();
            setLoading(true);

            const response = await fetch(fmscaRecordsUrl);
            const csvStr = await response.text();
            const dataList = csv.parseCsv(csvStr, {
                keyReplacer: replaceKeys,
                valueReplacer: replaceValues,
            });

            const allRecords = dataList.map(Record.create);
            setAllRecords(allRecords);
        } catch (err) {
            const error = err as Error;
            console.error("Error fetching CSV data:", err);
            toast.error(error.message);
        } finally {
            setLoading(false);
            loader.hide();
        }
    }, []);

    useEffect(() => {
        setFilters(currentDashboard.datasetFilters);
    }, [currentDashboard]);

    useEffect(() => {
        getRecordStatuses({ allRecords });
        getEntityTypes({ allRecords });
        getOperatingStatuses({ allRecords });
        getStates({ allRecords });
    }, [allRecords]);

    useEffect(() => {
        getFilteredRecords({ allRecords, filters });
    }, [allRecords, filters]);

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
