import { forwardRef, ReactElement, ReactNode, Ref } from "react";
import { createPortal } from "react-dom";
import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    ButtonProps,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

import { useModal } from "@providers";

import { ModalContainer } from "./styles";

type ModalVariant = "success" | "error" | "warning" | "info";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
) {
    return (
        <Slide
            direction="up"
            ref={ref}
            {...props}
        />
    );
});

interface ModalProps {
    visible: boolean;
    title?: ReactNode;
    description?: ReactNode;
    buttons?: ButtonProps[];
    hide?: () => void;
    variant?: ModalVariant;
    parentElement?: Element | DocumentFragment;
}

function Modal(props: ModalProps) {
    const {
        parentElement,
        visible,
        title,
        description,
        buttons = [],
        hide,
        variant,
    } = props;
    const modal = useModal();

    const handleHide = () => {
        if (!hide) {
            modal.hide();
        } else {
            hide();
        }
    };

    const modalEl = (
        <ModalContainer
            keepMounted
            open={visible}
            TransitionComponent={Transition}
            onClose={handleHide}
            variant={variant}
        >
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                {description && (
                    <>
                        {typeof description === "string" ? (
                            <DialogContentText>{description}</DialogContentText>
                        ) : (
                            description
                        )}
                    </>
                )}
            </DialogContent>
            <DialogActions>
                {buttons.map((buttonProps) => (
                    <Button {...buttonProps} />
                ))}
            </DialogActions>
        </ModalContainer>
    );

    return parentElement ? createPortal(modalEl, parentElement) : modalEl;
}

export default Modal;
export { Modal };
export type { ModalProps, ModalVariant };
