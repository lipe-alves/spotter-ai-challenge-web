import Record from "@models/Record";

interface GetStatesArgs {
    allRecords: Record[];
}

function getStates(e: { data: GetStatesArgs }): void {
    const { allRecords } = e.data;

    const entityTypes = allRecords.reduce((states, record) => {
        states = Array.from(new Set([...states, record.pState]));
        return states;
    }, [] as string[]);

    postMessage(entityTypes);
}

export default getStates;
export type { GetStatesArgs };
