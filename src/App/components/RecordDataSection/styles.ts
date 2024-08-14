import { styled } from "@mui/material/styles";

const TableContainer = styled("div")(() => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 0,
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
}));

const TabContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
}));

export { TableContainer, TabContainer };
