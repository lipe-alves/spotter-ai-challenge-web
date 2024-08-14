import { styled } from "@mui/material/styles";
import { toNumber } from "@utils";
import { APP_BAR_HEIGHT, THEME_SIZES } from "@assets/styles/constants";

const DashboardRoot = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: THEME_SIZES.md,
    width: "100%",
    height: "100%",
    padding: theme.spacing("lg"),
    paddingTop: 0,
    overflow: "auto",
}));

const DashboardHeader = styled("header")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: THEME_SIZES.sm,
    width: "100%",
    height: "fit-content",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing("lg"),
    paddingTop: APP_BAR_HEIGHT + toNumber(theme.spacing("lg")),
    color: theme.palette.secondary.light,

    "& h1": {
        margin: "18px 0",
    },
}));

const DashboardHeaderButtons = styled("div")(() => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    gap: THEME_SIZES.sm,
    flexWrap: "wrap",
    width: "100%",
    height: "fit-content",
    backgroundColor: "transparent",
}));

const ShareLinkModal = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: theme.spacing("sm"),
}));

const DashNameModal = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: theme.spacing("sm"),
}));

const DashNameModalButtons = styled("footer")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    gap: theme.spacing("sm"),
}));

export {
    DashboardRoot,
    DashboardHeader,
    DashboardHeaderButtons,
    ShareLinkModal,
    DashNameModal,
    DashNameModalButtons,
};
