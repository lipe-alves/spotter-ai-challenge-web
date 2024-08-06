import { styled } from "@mui/material/styles";
import { darkenColor } from "@utils";
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
}

const StatsCard = styled("div")<StatsCardProps>(({ theme, color }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: THEME_SIZES.xs,
    flex: 1,
    textAlign: "center",
    borderRadius: 8,
    backgroundImage: `linear-gradient(to bottom right, ${color}, ${darkenColor(
        color,
        10
    )})`,
    color: theme.palette.secondary.light,
    fontWeight: 600,
    height: 150,
    padding: theme.spacing("md"),
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    cursor: "pointer",
    transition: theme.transitions.create("opacity", {
        duration: 500,
        easing: theme.transitions.easing.easeIn,
    }),

    [theme.breakpoints.down("md")]: {
        width: "100%",
    },

    "&:hover": {
        opacity: 0.8,
    },
}));

export { StatsContainer, StatsCard };
export type { StatsCardProps };
