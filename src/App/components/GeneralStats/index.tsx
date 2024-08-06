import { useDataset } from "@providers";
import { stringToColor } from "@utils";
import { EntityType } from "@models/Record";

import { StatsContainer, StatsCard } from "./styles";

function GeneralStats() {
    const { allRecords, entityTypes, setFilters } = useDataset();

    const getEntityTypeCount = (entityType: EntityType) => {
        return allRecords.filter((record) =>
            record.entityType.includes(entityType)
        ).length;
    };

    const entityDataList = entityTypes.map((entityType) => [
        entityType,
        getEntityTypeCount(entityType),
        stringToColor(entityType),
    ]) as [entity: EntityType, count: number, color: string][];

    const handleFilterByEntityType = (entityType: EntityType) => () => {
        setFilters((prev) => ({
            ...prev,
            search: entityType,
        }));
    };

    return (
        <StatsContainer>
            {entityDataList.map(([entityType, count, color]) => (
                <StatsCard
                    color={color}
                    onClick={handleFilterByEntityType(entityType)}
                >
                    <span>{entityType}</span>
                    <span>{count.toLocaleString("en-US")}</span>
                </StatsCard>
            ))}
        </StatsContainer>
    );
}

export default GeneralStats;
export { GeneralStats };
