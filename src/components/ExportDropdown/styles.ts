import Button, { ButtonProps } from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";

interface FormContainerProps {
    fullWidth?: boolean;
}

const FormContainer = styled("div")<FormContainerProps>(({ fullWidth }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    width: fullWidth ? "100%" : "auto",
}));

const ExportButton = styled(Button)<ButtonProps>(() => ({
    textTransform: "none",
}));

ExportButton.defaultProps = {
    variant: "outlined",
    color: "primary",
};

const ExportMenu = styled(Menu)<MenuProps>(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

ExportMenu.defaultProps = {
    elevation: 0,
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "right",
    },
};

const ExportButtonList = styled("div")(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 8,
}));

export { FormContainer, ExportButton, ExportMenu, ExportButtonList };
export type { FormContainerProps };
