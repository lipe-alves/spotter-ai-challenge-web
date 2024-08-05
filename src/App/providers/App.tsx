import React, { createContext, useContext, useState } from "react";
import { ContextProviderProps } from "@types";

interface AppValue {
    drawerOpen: boolean;
    toggleDrawerOpen: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const AppContext = createContext<AppValue | undefined>(undefined);

function AppProvider(props: ContextProviderProps) {
    const { children } = props;

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawerOpen = () => {
        setDrawerOpen((prev) => !prev);
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <AppContext.Provider
            value={{
                drawerOpen,
                toggleDrawerOpen,
                openDrawer,
                closeDrawer,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

function useApp() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useApp must be used within a AppProvider!");
    }

    return context;
}

export { AppContext, AppProvider, useApp };
export type { AppValue };
