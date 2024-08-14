import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";

import {
    TablesProvider,
    DatasetProvider,
    LoaderProvider,
    ModalProvider,
    SetupProvider,
    ToastProvider,
} from "@providers";
import { Composer, ComponentList } from "@components";
import App from "./App";

import theme from "@assets/styles/theme";
import "@assets/styles/index.scss";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const providers: ComponentList = [
    [ThemeProvider, { theme }],
    [LoaderProvider],
    [ToastProvider],
    [ModalProvider],
    [SetupProvider],
    [DatasetProvider],
    [TablesProvider],
];

root.render(
    <React.StrictMode>
        <Composer components={providers}>
            <CssBaseline />
            <App />
        </Composer>
    </React.StrictMode>
);
