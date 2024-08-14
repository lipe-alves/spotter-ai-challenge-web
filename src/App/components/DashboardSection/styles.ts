import { styled } from "@mui/material/styles";
import { THEME_SIZES } from "@assets/styles/constants";

const SectionContainer = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
    width: "100%",
    backgroundColor: "transparent",
}));

const SectionTitle = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    width: "100%",
    height: 64,
    backgroundColor: "transparent",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    marginBottom: THEME_SIZES.md,
}));

export { SectionContainer, SectionTitle };
