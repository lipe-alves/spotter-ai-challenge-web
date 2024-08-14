import { ReactNode } from "react";
import { Typography } from "@mui/material";
import { SectionContainer, SectionTitle } from "./styles";

interface DashboardSectionProps {
    title: string;
    children: ReactNode;
}

function DashboardSection(props: DashboardSectionProps) {
    const { title, children } = props;

    return (
        <SectionContainer>
            <SectionTitle>
                <Typography variant="h4">{title}</Typography>
            </SectionTitle>
            {children}
        </SectionContainer>
    );
}

export default DashboardSection;
