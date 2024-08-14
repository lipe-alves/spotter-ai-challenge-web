import { useDataset, useTables } from "@providers";
import { stringToColor } from "@utils";
import { EntityType } from "@models/Record";

import { StatsContainer, StatsCard } from "./styles";

function GeneralStats() {
    const { entityTypes, filters, setFilters } = useDataset();
    const { allMainTableRows } = useTables();

    const getEntityTypeCount = (entityType: EntityType) => {
        return allMainTableRows.filter((row) =>
            row.entityType.includes(entityType)
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
                    selected={filters.search?.includes(entityType)}
                >
                    <h1>{count.toLocaleString("en-US")}</h1>
                    <h2>{entityType}</h2>
                </StatsCard>
            ))}
        </StatsContainer>
    );
}

export default GeneralStats;
export { GeneralStats };
