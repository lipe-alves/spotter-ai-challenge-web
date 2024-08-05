import { styled } from "@mui/material/styles";
import colors from "@assets/styles/colors";

const RootContainer = styled("main")(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colors.secondary.main,
    height: "100vh",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
}));

export { RootContainer };
