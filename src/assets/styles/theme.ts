import { createTheme } from "@mui/material";
import { ThemeSize } from "@types";
import colors from "./colors";
import { THEME_SIZES } from "./constants";

const theme = createTheme({
    palette: {
        primary: colors.primary,
        secondary: colors.secondary,
    },
    spacing: (factor: string | number) => {
        return typeof factor === "number"
            ? factor * THEME_SIZES.sm
            : Number(THEME_SIZES[factor as ThemeSize]);
    },
});

export default theme;
