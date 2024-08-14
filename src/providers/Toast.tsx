import { createContext, useContext, ReactNode } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface ToastValue {
    show: (text: string, params?: ToastOptions) => void;
    success: (text: string, params?: ToastOptions) => void;
    error: (text: string, params?: ToastOptions) => void;
    info: (text: string, params?: ToastOptions) => void;
}

const ToastContext = createContext<ToastValue | undefined>(undefined);

function ToastProvider(props: { children: ReactNode }) {
    const show = (text: string, params?: ToastOptions) => {
        toast(text, {
            position: "top-center",
            ...params,
        });
    };

    const success = (text: string, params?: ToastOptions) => {
        show(text, {
            ...params,
            type: "success",
        });
    };

    const error = (text: string, params?: ToastOptions) => {
        show(text, {
            ...params,
            type: "error",
        });
    };

    const info = (text: string, params?: ToastOptions) => {
        show(text, {
            ...params,
            type: "info",
        });
    };

    return (
        <ToastContext.Provider value={{ show, success, error, info }}>
            {props.children}
            <ToastContainer />
        </ToastContext.Provider>
    );
}

function useToast() {
    const context = useContext(ToastContext);
    if (!context)
        throw new Error("useToast must be used within a ToastProvider");
    return context;
}

export { ToastContext, ToastProvider, useToast };
export type { ToastValue, ToastOptions };
