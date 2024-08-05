import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar, { ToolbarProps } from "@mui/material/Toolbar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import {
    APP_BAR_HEIGHT,
    DRAWER_WIDTH,
    THEME_SIZES,
} from "@assets/styles/constants";
import colors from "@assets/styles/colors";

interface HeaderBarProps extends AppBarProps {
    drawerOpen?: boolean;
}

const HeaderBar = styled(AppBar)<HeaderBarProps>(({ theme, drawerOpen }) => ({
    height: APP_BAR_HEIGHT,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(drawerOpen && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

HeaderBar.defaultProps = {
    position: "absolute",
    elevation: 1,
};

const NavContainer = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
    paddingRight: theme.spacing("lg"),
}));

interface LogoButtonProps extends IconButtonProps {
    drawerOpen?: boolean;
}

const LogoButton = styled(IconButton)<LogoButtonProps>(
    ({ drawerOpen, theme }) => ({
        marginRight: theme.spacing("sm"),
        ...(drawerOpen && { display: "none" }),
    })
);

LogoButton.defaultProps = {
    edge: "start",
    color: "inherit",
};

const LogoImage = styled("img")(() => ({
    width: THEME_SIZES.md,
    height: THEME_SIZES.md,
    objectFit: "contain",
}));

const AppTitle = styled(Typography)<TypographyProps>(() => ({
    flexGrow: 1,
}));

AppTitle.defaultProps = {
    component: "h1",
    variant: "h6",
    color: "inherit",
    noWrap: true,
};

const NotificationCount = styled(Badge)<BadgeProps>(() => ({
    "& .MuiBadge-badge": {
        backgroundColor: colors.attention.main,
        boxShadow: `${colors.attention.main} 0px 7px 29px 0px`,
    },
}));

export {
    HeaderBar,
    NavContainer,
    LogoButton,
    LogoImage,
    AppTitle,
    NotificationCount,
};
export type { HeaderBarProps, LogoButtonProps };
