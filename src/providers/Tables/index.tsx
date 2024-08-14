import {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    MutableRefObject,
} from "react";
import { useGridApiRef } from "@mui/x-data-grid";
import { GridApiCommunity } from "@mui/x-data-grid/models/api/gridApiCommunity";

import { useWorker } from "@hooks";
import { ContextProviderProps } from "@types";

import RecordRow, { RecordRowModes } from "@models/RecordRow";
import { MainTableState, PivotTableState } from "@models/DashboardSetup";

import { useDataset } from "../Dataset";
import { useSetup } from "../Setup";

import generateMainTableRows, {
    MainTableRowsGeneratorArgs,
} from "./generateMainTableRows";

type SetRowsFunction = Dispatch<SetStateAction<RecordRow[]>>;
type SetRowModesFunction = Dispatch<SetStateAction<RecordRowModes>>;
type SetMainTableState = Dispatch<SetStateAction<MainTableState>>;
type SetPivotTableState = Dispatch<SetStateAction<PivotTableState>>;

interface TablesValue {
    mainTableApi: MutableRefObject<GridApiCommunity>;
    pivotTableApi: MutableRefObject<GridApiCommunity>;
    allMainTableRows: RecordRow[];
    filteredAndSortedMainTableRows: RecordRow[];
    rowModes: RecordRowModes;
    setRowModes: SetRowModesFunction;
    mainTableState: MainTableState;
    setMainTableState: SetMainTableState;
    syncMainTable: () => MainTableState;
    pivotTableState: PivotTableState;
    setPivotTableState: SetPivotTableState;
    syncPivotTable: () => PivotTableState;
}

const TablesContext = createContext<TablesValue | undefined>(undefined);

function TablesProvider(props: ContextProviderProps) {
    const { children } = props;
    const { filteredRecords, filters } = useDataset();
    const { currentDashboard } = useSetup();

    const {
        result: allMainTableRows = [],
        postMessage: getAllMainTableRows,
    } = useWorker<RecordRow[], MainTableRowsGeneratorArgs>(
        generateMainTableRows
    );

    const [rowModes, setRowModes] = useState<RecordRowModes>({});
    const [mainTableState, setMainTableState] = useState<MainTableState>(
        currentDashboard.mainTableState
    );
    const [pivotTableState, setPivotTableState] = useState<PivotTableState>(
        currentDashboard.pivotTableState
    );

    const mainTableApi = useGridApiRef();
    const pivotTableApi = useGridApiRef();

    const filteredAndSortedMainTableRows = useMemo(() => {
        const mainTableApiIsDefined =
            !!mainTableApi.current &&
            Object.keys(mainTableApi.current).length > 0;
        if (!mainTableApiIsDefined) return [];

        const state = mainTableApi.current.state;
        const rows: RecordRow[] = [];
        const rowIds = state.sorting?.sortedRows || [];

        for (const id of rowIds) {
            const row = allMainTableRows.find((row) => row.id === id);
            if (!row) continue;
            rows.push(row);
        }

        return rows;
    }, [mainTableApi.current, allMainTableRows]);

    const syncMainTable = () => {
        const state = mainTableApi.current.exportState();
        const newState = {
            ...mainTableState,
            ...state,
        };
        return newState;
    };

    const syncPivotTable = () => {
        const state = pivotTableApi.current.exportState();
        const newState = {
            ...pivotTableState,
            ...state,
        };
        return newState;
    };

    useEffect(() => {
        const currDashJson = currentDashboard.toJSON();
        const mainTableState: MainTableState = {
            ...currDashJson.mainTableState,
        };
        const pivotTableState: PivotTableState = {
            ...currDashJson.pivotTableState,
        };

        const mainTableStateEntries = Object.entries(
            currDashJson.mainTableState.rows
        );
        for (const [id, data] of mainTableStateEntries) {
            mainTableState.rows[id] = RecordRow.create(data as any);
        }

        setMainTableState(mainTableState);
        setPivotTableState(pivotTableState);
    }, [currentDashboard.mainTableState, currentDashboard.pivotTableState]);

    useEffect(() => {
        const filteredRecordRows = filteredRecords.map(RecordRow.create);
        getAllMainTableRows({
            mainTableState,
            filteredRecordRows,
        });
    }, [mainTableState, filteredRecords, filters]);

    return (
        <TablesContext.Provider
            value={{
                mainTableApi,
                pivotTableApi,
                allMainTableRows,
                filteredAndSortedMainTableRows,
                rowModes,
                setRowModes,
                mainTableState,
                setMainTableState,
                syncMainTable,
                pivotTableState,
                setPivotTableState,
                syncPivotTable,
            }}
        >
            {children}
        </TablesContext.Provider>
    );
}

function useTables() {
    const context = useContext(TablesContext);

    if (!context) {
        throw new Error("useTables must be used within a TablesProvider!");
    }

    return context;
}

export { TablesContext, TablesProvider, useTables };
export type { TablesValue, SetRowsFunction, SetRowModesFunction };
