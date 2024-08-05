import { CellProps } from "./index";

function EntityCell(props: CellProps) {
    const { row } = props;

    return (
        <span>
            {row.entityType.map((entity) => entity.toLowerCase()).join("/")}
        </span>
    );
}

export default EntityCell;
export { EntityCell };
