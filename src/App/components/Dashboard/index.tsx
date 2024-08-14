import { useEffect, useState } from "react";
import {
    Badge,
    Button,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    useLoader,
    useToast,
    useTables,
    useSetup,
    useDataset,
    useModal,
} from "@providers";
import DashboardSetup from "@models/DashboardSetup";

import DashboardSection from "../DashboardSection";
import GeneralStats from "../GeneralStats";
import RecordDataSection from "../RecordDataSection";
import OutOfServiceSection from "../OutOfServiceSection";
import EntityOverviewSection from "../EntityOverviewSection";

import {
    Add as AddIcon,
    Save as SaveIcon,
    List as ListIcon,
    Share as ShareIcon,
    ContentCopy as CopyIcon,
    Check as CheckIcon,
    Delete as DeleteIcon,
    CheckBoxOutlineBlank as CheckBlankIcon,
    CheckBox as CheckCheckedIcon,
} from "@mui/icons-material";

import {
    DashboardRoot,
    DashboardHeader,
    DashboardHeaderButtons,
    ShareLinkModal,
    DashNameModal,
    DashNameModalButtons,
} from "./styles";

function Dashboard() {
    const {
        currentDashboard,
        myDashboards,
        saveDashboard,
        deleteDashboard,
        selectDashboard,
        startANewDashboard,
    } = useSetup();
    const { filters: datasetFilters } = useDataset();
    const { syncMainTable, syncPivotTable } = useTables();
    const loader = useLoader();
    const toast = useToast();
    const modal = useModal();

    const handleSaveDashboard = async () => {
        try {
            const mainTableState = syncMainTable();
            const pivotTableState = syncPivotTable();

            if (
                !currentDashboard.name ||
                currentDashboard.name === "Untitled"
            ) {
                const promise = new Promise<string>((resolve) => {
                    modal.show({
                        title: "Your dashboard needs a name!",
                        description: <DashboardName saveName={resolve} />,
                    });
                });

                currentDashboard.name = await promise;
                modal.hide();
            }

            loader.show();

            await saveDashboard({
                name: currentDashboard.name,
                mainTableState,
                pivotTableState,
                datasetFilters,
            });

            toast.success("Dashboard saved successfully!");
        } catch (err) {
            const error = err as Error;
            console.error("Error saving dashboard:", err);
            toast.error(error.message);
        } finally {
            loader.hide();
        }
    };

    const handleShareDashboard = () => {
        if (!currentDashboard.saved) return;

        const url = new URL(window.location.href);
        url.searchParams.set("id", currentDashboard.id);
        const shareLink = url.href;

        modal.show({
            title: "Share link",
            description: <ShareLink shareLink={shareLink} />,
        });
    };

    const handleListDashboards = () => {
        const deleteDash = async (dash: DashboardSetup) => {
            try {
                loader.show();

                await deleteDashboard(dash);

                toast.success("Dashboard deleted successfully!");
            } catch (err) {
                const error = err as Error;
                console.error("Error deleting dashboard:", err);
                toast.error(error.message);
            } finally {
                loader.hide();
            }
        };

        modal.show({
            title: "My dashboards",
            description: (
                <DashboardList
                    currentDashboard={currentDashboard}
                    myDashboards={myDashboards}
                    deleteDashboard={deleteDash}
                    selectDashboard={selectDashboard}
                />
            ),
        });
    };

    return (
        <DashboardRoot>
            <DashboardHeader>
                <Typography
                    component="h1"
                    variant="h3"
                >
                    My dashboard
                </Typography>
                <DashboardHeaderButtons>
                    <Button
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={startANewDashboard}
                    >
                        Start an empty dashboard
                    </Button>
                    <Button
                        color="secondary"
                        startIcon={<SaveIcon />}
                        onClick={handleSaveDashboard}
                    >
                        Save dashboard
                    </Button>
                    <Badge
                        badgeContent={myDashboards.length}
                        color="success"
                    >
                        <Button
                            color="secondary"
                            startIcon={<ListIcon />}
                            onClick={handleListDashboards}
                        >
                            My dashboards
                        </Button>
                    </Badge>

                    <Tooltip
                        title={
                            !currentDashboard.saved &&
                            "You must save your dashboard first before sharing"
                        }
                    >
                        <Button
                            color="secondary"
                            startIcon={<ShareIcon />}
                            onClick={handleShareDashboard}
                        >
                            Share my dashboard
                        </Button>
                    </Tooltip>
                </DashboardHeaderButtons>
            </DashboardHeader>

            <GeneralStats />
            <DashboardSection title="Records Overview">
                <RecordDataSection />
            </DashboardSection>

            <DashboardSection title="Records Out of Service">
                <OutOfServiceSection />
            </DashboardSection>

            <DashboardSection title="Entity Overview">
                <EntityOverviewSection />
            </DashboardSection>
        </DashboardRoot>
    );
}

export default Dashboard;
export { Dashboard };

interface ShareLinkProps {
    shareLink: string;
}

function ShareLink(props: ShareLinkProps) {
    const { shareLink } = props;
    const [copied, setCopied] = useState(false);

    const handleCopyShareLink = async () => {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <ShareLinkModal>
            <p>Copy and paste the link below to share your dashboard data!</p>
            <TextField
                disabled
                fullWidth
                label="Dashboard link"
                value={shareLink}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleCopyShareLink}>
                                {copied ? <CheckIcon /> : <CopyIcon />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </ShareLinkModal>
    );
}

interface DashboardNameProps {
    saveName: (name: string) => void;
}

function DashboardName(props: DashboardNameProps) {
    const { saveName } = props;
    const [name, setName] = useState("");

    return (
        <DashNameModal>
            <TextField
                fullWidth
                label="Name"
                placeholder="Type a name"
                onChange={(evt) => setName(evt.target.value)}
                value={name}
            />

            <DashNameModalButtons>
                <Button
                    onClick={() => saveName(name)}
                    disabled={!name}
                >
                    Save dashboard
                </Button>
            </DashNameModalButtons>
        </DashNameModal>
    );
}

interface DashboardListProps {
    currentDashboard: DashboardSetup;
    myDashboards: DashboardSetup[];
    deleteDashboard: (dash: DashboardSetup) => Promise<void>;
    selectDashboard: (dash: DashboardSetup) => void;
}

function DashboardList(props: DashboardListProps) {
    const { currentDashboard, myDashboards, deleteDashboard, selectDashboard } =
        props;

    const [selectedDashboard, setSelectedDashboard] =
        useState(currentDashboard);
    const [dashboardList, setDashboardList] = useState([...myDashboards]);

    const dashboardIsSelected = (dash: DashboardSetup) => {
        return dash.id === selectedDashboard.id;
    };

    const handleDeleteDashboard = (dash: DashboardSetup) => async () => {
        await deleteDashboard(dash);
        setDashboardList((prev) => prev.filter((item) => item.id !== dash.id));
    };

    const handleSelectDashboard = (dash: DashboardSetup) => () => {
        selectDashboard(dash);
        setSelectedDashboard(dash);
    };

    useEffect(() => {
        setDashboardList(
            myDashboards.sort((a, b) => {
                const aSelected = dashboardIsSelected(a);
                const bSelected = dashboardIsSelected(b);
                if (aSelected) return -1;
                if (bSelected) return 1;
                return 0;
            })
        );
    }, [myDashboards]);

    return (
        <List>
            {dashboardList
                .map((dashboard) => {
                    const selected = dashboardIsSelected(dashboard);
                    return { dashboard, selected };
                })
                .map(({ dashboard, selected }) => (
                    <ListItem
                        key={dashboard.id}
                        disablePadding
                    >
                        <ListItemButton disabled={selected}>
                            {selected ? (
                                <ListItemIcon>
                                    <CheckCheckedIcon />
                                </ListItemIcon>
                            ) : (
                                <IconButton
                                    onClick={handleSelectDashboard(dashboard)}
                                    sx={{ px: 0 }}
                                >
                                    <CheckBlankIcon />
                                </IconButton>
                            )}
                            <ListItemText
                                inset
                                primary={dashboard.name}
                                secondary={
                                    dashboard.savedAt
                                        ? `Saved at ${dashboard.savedAt.toLocaleString()}`
                                        : `Created at ${dashboard.createdAt.toLocaleString()}`
                                }
                                sx={{ pl: selected ? 0 : 4 }}
                            />

                            <IconButton
                                onClick={handleDeleteDashboard(dashboard)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    );
}
