import React from "react";
import { CircularProgress } from "@mui/material";
import { SpinnerBackdrop } from "./styles";

interface SpinnerProps {
    open: boolean;
    onClose: () => void;
}

function Spinner(props: SpinnerProps) {
    const { open, onClose } = props;

    return (
        <SpinnerBackdrop
            open={open}
            onClick={onClose}
        >
            <CircularProgress color="primary" />
        </SpinnerBackdrop>
    );
}

export default Spinner;
export { Spinner };
export type { SpinnerProps };
