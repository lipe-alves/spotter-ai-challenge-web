import { styled } from "@mui/material/styles";
import { toNumber } from "@utils";
import { APP_BAR_HEIGHT } from "@assets/styles/constants";

const DashboardRoot = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: 0,
    width: "100%",
    height: "100%",
    padding: theme.spacing("lg"),
    paddingTop: APP_BAR_HEIGHT + toNumber(theme.spacing("lg")),
}));

export { DashboardRoot };
