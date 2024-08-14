import React, { createContext, useContext, useEffect, useState } from "react";

import { ContextProviderProps } from "@types";
import { useQueryParams, useAsyncEffect } from "@hooks";
import { useLoader } from "./Loader";
import { useToast } from "./Toast";

import DashboardSetup, {
    MainTableState,
    PivotTableState,
} from "@models/DashboardSetup";
import { RecordFilters } from "@models/Record";

import * as Api from "@api";

interface SaveDashboardArgs {
    name?: string;
    mainTableState: MainTableState;
    pivotTableState: PivotTableState;
    datasetFilters: RecordFilters;
}

interface SetupValue {
    currentDashboard: DashboardSetup;
    myDashboards: DashboardSetup[];
    saveDashboard: (data: SaveDashboardArgs) => Promise<void>;
    deleteDashboard: (dash: DashboardSetup) => Promise<void>;
    selectDashboard: (dash: DashboardSetup) => void;
    startANewDashboard: () => void;
}

const SetupContext = createContext<SetupValue | undefined>(undefined);

function SetupProvider(props: ContextProviderProps) {
    const { children } = props;

    const { id = "" } = useQueryParams();
    const toast = useToast();
    const loader = useLoader();

    const [currentDashboard, setCurrentDashboard] = useState<DashboardSetup>(
        DashboardSetup.create()
    );
    const [myDashboards, setMyDashboards] = useState<DashboardSetup[]>([]);

    const saveDashboard = async (data: SaveDashboardArgs) => {
        const {
            name = currentDashboard.name,
            mainTableState,
            pivotTableState,
            datasetFilters,
        } = data;

        const newDashboard = await Api.cases.saveMyDashboard({
            id: currentDashboard.id,
            name,
            mainTableState,
            pivotTableState,
            datasetFilters,
        });
        setCurrentDashboard(newDashboard);

        const myDashs = await Api.cases.listMyDashboards();
        setMyDashboards(myDashs);
    };

    const deleteDashboard = async (dash: DashboardSetup) => {
        await Api.cases.deleteDashboard(dash.id);

        if (dash.id === currentDashboard.id) {
            setCurrentDashboard(DashboardSetup.create());
        }

        const myDashs = await Api.cases.listMyDashboards();
        setMyDashboards(myDashs);
    };

    const selectDashboard = (dash: DashboardSetup) => {
        setCurrentDashboard(dash);
    };

    const startANewDashboard = () => {
        setCurrentDashboard(DashboardSetup.create());
    };

    useAsyncEffect(async () => {
        try {
            loader.show();

            let authId = await Api.cases.getLocalAuthId();
            if (!authId) authId = await Api.cases.generateLocalAuthId();

            const myDashs = await Api.cases.listMyDashboards();
            setMyDashboards(myDashs);

            if (!id) return;

            const currDash = await Api.cases.getDashboardById(id);
            if (!currDash) return;

            setCurrentDashboard(currDash);
        } catch (err) {
            console.error("Error fetching dashboard setup:", err);
            toast.error((err as Error).message);
        } finally {
            loader.hide();
        }
    }, [id]);

    useEffect(() => {
        const url = new URL(window.location.href);
        url.searchParams.set(
            "id",
            currentDashboard.saved ? currentDashboard.id : ""
        );
        window.history.pushState({}, "", url.href);
    }, [currentDashboard.id]);

    return (
        <SetupContext.Provider
            value={{
                currentDashboard,
                myDashboards,
                saveDashboard,
                deleteDashboard,
                selectDashboard,
                startANewDashboard,
            }}
        >
            {children}
        </SetupContext.Provider>
    );
}

function useSetup() {
    const context = useContext(SetupContext);

    if (!context) {
        throw new Error("useSetup must be used within a SetupProvider!");
    }

    return context;
}

export { SetupContext, SetupProvider, useSetup };
export type { SetupValue };
