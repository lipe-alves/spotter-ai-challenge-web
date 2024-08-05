import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Button, { ButtonProps } from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";

import { toNumber } from "@utils";
import { APP_BAR_HEIGHT, THEME_SIZES } from "@assets/styles/constants";

const DashboardRoot = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    padding: theme.spacing("lg"),
    paddingTop: APP_BAR_HEIGHT + toNumber(theme.spacing("lg")),
}));

const DashboardTabs = styled(Tabs)<TabsProps>(() => ({
    overflow: "auto",

    "& .MuiTabs-indicator": {
        display: "none",
    },
}));

interface DashboardTabProps extends TabProps {
    isMobile?: boolean;
    index: number;
}

const DashboardTab = styled(Tab)<DashboardTabProps>(
    ({ theme, index, isMobile }) => {
        const beforeStyle = {
            width: "10em",
            display: "inline-block",
            padding: ".7em 2em .5em",
            color: "#fff",
            textDecoration: "none",
            margin: "0 -.3em",
            border: ".2em solid #fff",
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
            borderBottom: "none",
            borderRadius: ".4em .4em 0 0",
            backgroundColor: theme.palette.secondary.light,
            transform: "scale(1.2, 1.3) perspective(.5em) rotateX(5deg)",
            boxShadow: "rgba(149, 157, 165, 0.2) -15px 8px 24px",
        };

        return {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "none",
            borderTopLeftRadius: THEME_SIZES.sm,
            backgroundColor: "transparent",
            boxShadow: "rgba(149, 157, 165, 0.2) -15px 8px 24px",
            width: 170,
            height: 64,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginLeft: index !== 0 ? -15 : 0,
            opacity: 0.5,

            "&.Mui-selected": {
                opacity: 1,
            },

            "&::before": { ...beforeStyle },

            "& span": {
                textTransform: "capitalize",
                zIndex: 2,
            },

            ...(isMobile && {
                fontSize: 14,
                width: 150,
                height: 34,

                "&::before": {
                    ...beforeStyle,
                    left: -15,
                },
            }),
        };
    }
);

const DashboardHeader = styled("header")(() => ({
    width: "100%",
}));

const DashboardTools = styled("div")(({ theme }) => ({
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

const DashboardContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
}));

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

export {
    DashboardRoot,
    DashboardHeader,
    DashboardTabs,
    DashboardTab,
    DashboardContainer,
    DashboardTools,
    FormContainer,
    ExportButton,
    ExportMenu,
    ExportButtonList,
};
export type { FormContainerProps, DashboardTabProps };
