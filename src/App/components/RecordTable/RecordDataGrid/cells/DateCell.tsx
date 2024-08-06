import { dateIsValid } from "@utils";
import { CellProps } from "./index";

interface DateCellProps extends CellProps {
    field: "createdDt" | "dataSourceModifiedDt" | "outOfServiceDate";
}

function DateCell(props: DateCellProps) {
    const { field, row } = props;
    const date = row[field];

    if (!dateIsValid(date)) {
        return <span>-</span>;
    }

    return <span>{date.toDateString()}</span>;
}

export default DateCell;
export { DateCell };
