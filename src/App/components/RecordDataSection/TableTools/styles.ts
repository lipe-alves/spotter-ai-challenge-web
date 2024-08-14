import { styled } from "@mui/material/styles";

const TableToolsContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    padding: theme.spacing("md"),
    width: "100%",
    flexWrap: "wrap",

    "& input": {
        padding: theme.spacing("sm"),
    },
}));

interface ToolsSectionProps {
    fullWidth?: boolean;
}

const ToolsSection = styled("div")<ToolsSectionProps>(({ fullWidth }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    width: fullWidth ? "100%" : "auto",
}));

export { TableToolsContainer, ToolsSection };
export type { ToolsSectionProps };
