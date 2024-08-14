import TableHeader from "./TableHeader";
import TableTools from "./TableTools";
import RecordDataGrid from "./TableDataGrid";

import { TabContainer, TableContainer } from "./styles";

function RecordDataSection() {
    return (
        <TableContainer>
            <TableHeader />
            <TabContainer>
                <TableTools />
                <RecordDataGrid />
            </TabContainer>
        </TableContainer>
    );
}

export default RecordDataSection;
