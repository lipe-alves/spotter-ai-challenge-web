import Dialog, { DialogProps } from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { ModalVariant } from "./index";

interface ModalContainerProps extends DialogProps {
    variant?: ModalVariant;
}

const ModalContainer = styled(Dialog)<ModalContainerProps>(
    ({ theme, variant }) => ({
        zIndex: 9999,
        ...(variant && {
            color: theme.palette[variant].main,
        }),
    })
);

export { ModalContainer };
export type { ModalContainerProps };
