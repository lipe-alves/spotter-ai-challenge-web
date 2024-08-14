import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { THEME_SIZES } from "@assets/styles/constants";

const TableTabs = styled(Tabs)<TabsProps>(() => ({
    overflow: "auto",

    "& .MuiTabs-indicator": {
        display: "none",
    },
}));

interface TableTabProps extends TabProps {
    isMobile?: boolean;
    index: number;
}

const TableTab = styled(Tab)<TableTabProps>(({ theme, index, isMobile }) => {
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
});

const TableHeaderContainer = styled("header")(() => ({
    width: "100%",
}));

export { TableHeaderContainer, TableTabs, TableTab };
export type { TableTabProps };
