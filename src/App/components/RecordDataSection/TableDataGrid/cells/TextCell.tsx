import { CellProps } from "./index";

interface TextCellProps extends CellProps {
    field: "legalName" | "dbaName" | "physicalAddress";
}

function TextCell(props: TextCellProps) {
    const { field, row } = props;
    const text = row[field];

    return <span>{text.toLowerCase()}</span>;
}

export default TextCell;
export { TextCell };
