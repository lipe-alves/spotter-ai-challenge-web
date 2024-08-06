import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { THEME_SIZES } from "@assets/styles/constants";

const DataGridContainer = styled(DataGrid)<DataGridProps>(({ theme }) => ({
    width: "100%",
    height: "100%",
    overflow: "auto",

    "* ": {
        fontSize: 1.625 * THEME_SIZES.sm,
    },

    "& .MuiDataGrid-columnHeaderTitleContainer": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    "& .MuiDataGrid-cell": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: "inherit",
        whiteSpace: "inherit",
        textOverflow: "inherit",
    },

    "& .MuiDataGrid-row": {
        "--height": "100px !important",
        maxHeight: "100px !important",
    },

    "& .MuiDataGrid-columnHeaders div[role='row']": {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.dark,
    },

    "& [data-status]": {
        textTransform: "capitalize",
        fontWeight: "bold",
        borderWidth: 2,
    },

    "& [data-field]": {
        textTransform: "capitalize",
    },

    "& [data-status] span": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
    },

    '& [data-status="ACTIVE"]': {
        borderColor: theme.palette.success.light,
        color: theme.palette.success.light,
    },

    '& [data-status="NOT AUTHORIZED"]': {
        borderColor: theme.palette.warning.light,
        color: theme.palette.warning.light,
    },

    '& [data-status="OUT-OF-SERVICE"]': {
        borderColor: theme.palette.error.light,
        color: theme.palette.error.light,
    },

    '& [data-status="UNSPECIFIED"]': {
        borderColor: "rgba(0, 0, 0, 0.5)",
        color: "rgba(0, 0, 0, 0.5)",
    },

    '& [data-field="id"][role="gridcell"]': {
        color: "rgba(150, 150, 150, 1)",
        fontWeight: "500",
    },
}));

export { DataGridContainer };
