import { BarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { styled } from "@mui/material/styles";

const PowerUnitsChart = styled(BarChart)<BarChartProps>(() => ({
    overflow: "visible",
}));

export { PowerUnitsChart };
