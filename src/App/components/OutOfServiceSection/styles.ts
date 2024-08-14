import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { PieChart, PieChartProps } from "@mui/x-charts/PieChart";
import { styled } from "@mui/material/styles";
import { THEME_SIZES } from "@assets/styles/constants";

const OutOfServiceContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: theme.spacing("md"),
    width: "100%",
    backgroundColor: "transparent",

    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
    },
}));

const OutOfServiceBarChart = styled(BarChart)<BarChartProps>(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    overflow: "visible",
    padding: 0,
    borderRadius: theme.spacing("sm"),
}));

const OutOfServicePieChart = styled(PieChart)<PieChartProps>(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.secondary.light,
    overflow: "visible",
    padding: THEME_SIZES.md,
    flex: 1,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius: theme.spacing("sm"),

    [theme.breakpoints.down("md")]: {
        flex: 1,
        width: "100%",
    },
}));

const BarChartContainer = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing("md"),
    flex: 2,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",

    [theme.breakpoints.down("md")]: {
        flex: 1,
        width: "100%",
    },
}));

const BarChartDateFilters = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: theme.spacing("sm"),
    width: "100%",
    height: 64,
}));

export {
    OutOfServiceContainer,
    OutOfServiceBarChart,
    BarChartContainer,
    OutOfServicePieChart,
    BarChartDateFilters,
};
