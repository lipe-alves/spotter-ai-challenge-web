import {
    Avatar,
    Divider,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    ChevronLeft as ChevronLeftIcon,
    Dashboard as DashboardIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    BarChart as BarChartIcon,
    Layers as LayersIcon,
} from "@mui/icons-material";

import { useApp } from "App/providers";
import {
    DrawerContainer,
    DrawerHeader,
    DrawerMenu,
    OnlineBadge,
    OnlineBadgeContainer,
} from "./styles";

function AppDrawer() {
    const { drawerOpen, toggleDrawerOpen } = useApp();
    return (
        <DrawerContainer open={drawerOpen}>
            <DrawerHeader>
                <IconButton onClick={toggleDrawerOpen}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <DrawerMenu>
                <ListItemButton>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <ShoppingCartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Orders" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reports" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>
                        <LayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Integrations" />
                </ListItemButton>
            </DrawerMenu>
            <div style={{ flex: 1 }} />
            <DrawerMenu>
                <OnlineBadgeContainer>
                    <OnlineBadge>
                        <Avatar
                            src="https://mui.com/static/images/avatar/1.jpg"
                            alt="Example photo"
                        />
                    </OnlineBadge>
                </OnlineBadgeContainer>
            </DrawerMenu>
        </DrawerContainer>
    );
}

export default AppDrawer;
export { AppDrawer };
