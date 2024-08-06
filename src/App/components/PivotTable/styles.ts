import { styled } from "@mui/material/styles";

const TableContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    marginBottom: theme.spacing("md"),
}));

const TableTools = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 8,
    padding: theme.spacing("md"),
    width: "100%",
    flexWrap: "wrap",

    "& input": {
        padding: theme.spacing("sm"),
    },
}));

export { TableContainer, TableTools };
