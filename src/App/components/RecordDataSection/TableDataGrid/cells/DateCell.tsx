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

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return (
        <span>
            {month}/{day}/{year} {hours}:{minutes}:{seconds}
        </span>
    );
}

export default DateCell;
export { DateCell };
