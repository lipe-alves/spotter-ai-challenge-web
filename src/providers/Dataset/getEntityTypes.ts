import Record, { EntityType } from "@models/Record";

interface GetEntityTypesArgs {
    allRecords: Record[];
}

function getEntityTypes(e: { data: GetEntityTypesArgs }): void {
    const { allRecords } = e.data;

    const entityTypes = allRecords.reduce((entities, record) => {
        entities = Array.from(new Set([...entities, ...record.entityType]));
        entities = entities.filter(Boolean);
        return entities;
    }, [] as EntityType[]);

    postMessage(entityTypes);
}

export default getEntityTypes;
export type { GetEntityTypesArgs };
