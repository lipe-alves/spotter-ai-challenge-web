import { LineChart, LineChartProps } from "@mui/x-charts/LineChart";
import { styled } from "@mui/material/styles";
import { THEME_SIZES } from "@assets/styles/constants";

const EntityOverviewLineChart = styled(LineChart)<LineChartProps>(
    ({ theme }) => ({
        backgroundColor: theme.palette.secondary.light,
        overflow: "visible",
        padding: THEME_SIZES.md,
        flex: 2,
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        borderRadius: theme.spacing("sm"),

        [theme.breakpoints.down("md")]: {
            flex: 1,
            width: "100%",
        },
    })
);

export { EntityOverviewLineChart };
