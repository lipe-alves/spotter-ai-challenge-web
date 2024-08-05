import { Chip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { CellProps } from "./index";

function OperatingStatusCell(props: CellProps) {
    const { row } = props;

    return (
        <Chip
            label={
                <span>
                    <CircleIcon />
                    {row.operatingStatus?.toLowerCase()}
                </span>
            }
            variant="outlined"
            data-status={row.operatingStatus}
        />
    );
}

export default OperatingStatusCell;
export { OperatingStatusCell };
