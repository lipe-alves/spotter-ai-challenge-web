import { CellProps } from "./index";

function IdCell(props: CellProps) {
    const { row } = props;

    return <span>#{row.id}</span>;
}

export default IdCell;
export { IdCell };
