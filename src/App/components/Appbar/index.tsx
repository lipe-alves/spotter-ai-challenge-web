import { IconButton } from "@mui/material";
import {
    Notifications as NotificationsIcon,
    Language as LanguageIcon,
    DashboardCustomizeOutlined as ShortcutIcon,
    Menu as MenuIcon,
} from "@mui/icons-material";

import { useWindowSize } from "@hooks";
import { useApp } from "App/providers";
import {
    HeaderBar,
    LogoButton,
    NavContainer,
    LogoImage,
    AppTitle,
    NotificationCount,
} from "./styles";

import Logo from "@assets/images/logo.svg";

function Appbar() {
    const { drawerOpen, toggleDrawerOpen } = useApp();
    const [windowWidth] = useWindowSize();
    const isMobile = windowWidth <= 600;

    return (
        <HeaderBar
            position="absolute"
            drawerOpen={drawerOpen}
        >
            <NavContainer>
                <LogoButton
                    onClick={toggleDrawerOpen}
                    drawerOpen={drawerOpen}
                    aria-label="open drawer"
                >
                    {!isMobile ? (
                        <LogoImage
                            src={Logo}
                            alt="Logo"
                        />
                    ) : (
                        <MenuIcon />
                    )}
                </LogoButton>
                <AppTitle>
                    {!isMobile
                        ? "Federal Motor Carrier Safety Administration (FMCSA)"
                        : "FMCSA"}
                </AppTitle>
                <IconButton color="inherit">
                    <LanguageIcon />
                </IconButton>
                <IconButton color="inherit">
                    <ShortcutIcon />
                </IconButton>
                <IconButton color="inherit">
                    <NotificationCount badgeContent={4}>
                        <NotificationsIcon />
                    </NotificationCount>
                </IconButton>
            </NavContainer>
        </HeaderBar>
    );
}

export default Appbar;
export { Appbar };
