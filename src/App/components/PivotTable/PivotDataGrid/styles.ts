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
}));

export { DataGridContainer };
