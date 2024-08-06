import { stringToColor } from "@utils";
import { CellProps } from "./index";

function EntityCell(props: CellProps) {
    const { row } = props;

    return (
        <>
            {row.entityType
                .map((entity) => [entity.toLowerCase(), stringToColor(entity)])
                .map(([entity, color], i) => {
                    const isLast = row.entityType.length === i + 1;

                    return (
                        <>
                            <span style={{ color }}>{entity}</span>
                            {!isLast && "/"}
                        </>
                    );
                })}
        </>
    );
}

export default EntityCell;
export { EntityCell };
