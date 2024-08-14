import { styled } from "@mui/material/styles";
import { THEME_SIZES } from "@assets/styles/constants";

const EntityDataGridContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: THEME_SIZES.sm,
    width: "100%",
    flexWrap: "wrap",
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius: theme.spacing("sm"),
}));

const EntityDataGridHeader = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing("sm"),
    padding: theme.spacing("md"),
    width: "100%",
    flexWrap: "wrap",

    "& input": {
        padding: theme.spacing("sm"),
    },
}));

const EntityDataGridDateFilters = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.spacing("sm"),
    padding: 0,
    flexWrap: "wrap",
}));

export {
    EntityDataGridContainer,
    EntityDataGridHeader,
    EntityDataGridDateFilters,
};
