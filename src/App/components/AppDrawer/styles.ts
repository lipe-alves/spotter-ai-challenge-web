import Drawer, { DrawerProps } from "@mui/material/Drawer";
import Toolbar, { ToolbarProps } from "@mui/material/Toolbar";
import List, { ListProps } from "@mui/material/List";
import Badge, { BadgeProps } from "@mui/material/Badge";
import ListItemButton, {
    ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";
import {
    APP_BAR_HEIGHT,
    DRAWER_WIDTH,
    THEME_SIZES,
} from "@assets/styles/constants";

interface DrawerContainerProps extends DrawerProps {
    open?: boolean;
}

const DrawerContainer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
})<DrawerContainerProps>(({ theme, open }) => ({
    height: "100vh",

    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        height: "100%",
        width: DRAWER_WIDTH,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: 0,
            [theme.breakpoints.up("sm")]: {
                width: THEME_SIZES.xl * 2,
            },
        }),
    },
}));

DrawerContainer.defaultProps = {
    as: "aside",
    variant: "permanent",
};

const DrawerHeader = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: `0 ${theme.spacing("sm")}px`,
    width: "100%",
    height: APP_BAR_HEIGHT,
}));

DrawerHeader.defaultProps = {
    as: "header",
};

const DrawerMenu = styled(List)<ListProps>(({ theme }) => ({}));

DrawerMenu.defaultProps = {
    component: "nav",
};

const OnlineBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.light,
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const OnlineBadgeContainer = styled(ListItemButton)<ListItemButtonProps>(
    () => ({
        paddingLeft: 11,
    })
);

OnlineBadge.defaultProps = {
    overlap: "circular",
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
    },
    variant: "dot",
};

export {
    DrawerContainer,
    DrawerHeader,
    DrawerMenu,
    OnlineBadge,
    OnlineBadgeContainer,
};
export type { DrawerContainerProps };
