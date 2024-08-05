import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { DatasetProvider } from "@providers";
import App from "./App";

import theme from "@assets/styles/theme";
import "@assets/styles/index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <DatasetProvider>
                <CssBaseline />
                <App />
            </DatasetProvider>
        </ThemeProvider>
    </React.StrictMode>
);
