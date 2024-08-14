import { styled } from "@mui/material/styles";

const EntityOverviewContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing("md"),
    width: "100%",
    backgroundColor: "transparent",

    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
    },
}));

export { EntityOverviewContainer };
