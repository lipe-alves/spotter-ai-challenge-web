import { EntityType } from "@models/Record";
import { useDataset } from "@providers";
import { PowerUnitsChart } from "./styles";

function PowerUnitsLineChart() {
    const { allRecords, entityTypes } = useDataset();

    const getPowerUnitsCount = (entityType: EntityType) => {
        return allRecords.reduce((sum, record) => {
            if (record.entityType.includes(entityType)) {
                return sum + record.powerUnits;
            }

            return sum;
        }, 0);
    };

    const dataset = entityTypes.map((entityType) => ({
        entity: entityType,
        [entityType]: getPowerUnitsCount(entityType),
    }));

    return (
        <PowerUnitsChart
            dataset={dataset}
            xAxis={[
                {
                    scaleType: "band",
                    dataKey: "entity",
                },
            ]}
            yAxis={[
                {
                    label: "power units",
                },
            ]}
            series={entityTypes.map((entityType) => ({
                dataKey: entityType,
                label: entityType,
            }))}
            height={400}
        />
    );
}

export default PowerUnitsLineChart;
export { PowerUnitsLineChart };
