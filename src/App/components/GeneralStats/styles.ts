import { styled } from "@mui/material/styles";
import { darkenColor, lightenColor } from "@utils";
import { THEME_SIZES } from "@assets/styles/constants";

const StatsContainer = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    gap: THEME_SIZES.sm,
    flexWrap: "wrap",
    width: "100%",
    backgroundColor: "transparent",
    marginBottom: theme.spacing("md"),

    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: THEME_SIZES.md,
    },
}));

interface StatsCardProps {
    color: string;
    selected?: boolean;
}

const StatsCard = styled("div")<StatsCardProps>(
    ({ theme, color, selected }) => {
        const darkShade = darkenColor(color, 10);
        const lightShade = lightenColor(color, 10);

        return {
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: THEME_SIZES.xs,
            flex: 1,
            textAlign: "center",
            borderRadius: 8,
            backgroundImage: `linear-gradient(to bottom right, ${color}, ${darkShade})`,
            color: theme.palette.secondary.light,
            fontWeight: 600,
            height: 200,
            padding: theme.spacing("md"),
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            cursor: "pointer",
            transition: theme.transitions.create(["opacity", "transform"], {
                duration: 500,
                easing: theme.transitions.easing.easeIn,
            }),
            overflow: "hidden",

            [theme.breakpoints.down("md")]: {
                width: "100%",
            },

            "&:hover": {
                opacity: 0.8,
                transform: "scale(0.95)",
            },

            ...(selected && {
                opacity: 0.8,
                transform: "scale(0.95)",
            }),

            "&:before, &:after": {
                content: '""',
                position: "absolute",
                width: 210,
                height: 210,
                backgroundColor: darkShade,
                borderRadius: "50%",
                opacity: 0.5,
                zIndex: 1,
                top: -130,
                right: -10,
            },

            "&:after": {
                backgroundColor: lightShade,
                top: -85,
                right: -95,
                zIndex: 1,
            },

            "& h1, h2": {
                margin: 0,
                zIndex: 3,
            },

            "& h1": {
                fontSize: THEME_SIZES.xl,
            },

            "& h2": {
                fontSize: THEME_SIZES.md,
                opacity: 0.5,
            },
        };
    }
);

export { StatsContainer, StatsCard };
export type { StatsCardProps };
