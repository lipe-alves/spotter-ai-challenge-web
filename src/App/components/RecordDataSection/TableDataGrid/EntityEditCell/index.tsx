import { useGridApiContext } from "@mui/x-data-grid";
import { Select, MenuItem } from "@mui/material";
import { useDataset } from "@providers";

interface EntityEditCellProps {
    id: any;
    value?: string;
}

interface EntityChangeEvent {
    target: {
        name: string;
        value: string;
    };
}

function EntityEditCell(props: EntityEditCellProps) {
    const { id, value = "" } = props;
    const { entityTypes } = useDataset();
    const apiRef = useGridApiContext();

    const handleChange = (evt: EntityChangeEvent) => {
        const eventValue = evt.target.value;
        const newValue =
            typeof eventValue === "string" ? value.split("/") : eventValue;

        apiRef.current.setEditCellValue({
            id,
            field: "entityType",
            value: newValue.filter((x) => x !== ""),
        });
    };

    return (
        <Select
            multiple
            fullWidth
            onChange={handleChange}
            value={value}
        >
            {entityTypes.map((option) => (
                <MenuItem
                    key={option}
                    value={option}
                >
                    {option}
                </MenuItem>
            ))}
        </Select>
    );
}

export default EntityEditCell;
export { EntityEditCell };
