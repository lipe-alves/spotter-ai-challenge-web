import Backdrop, { BackdropProps } from "@mui/material/Backdrop";
import { styled } from "@mui/material/styles";

const SpinnerBackdrop = styled(Backdrop)<BackdropProps>(() => ({
    zIndex: 10000,
}));

export { SpinnerBackdrop };
