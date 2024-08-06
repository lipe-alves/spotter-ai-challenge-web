import GeneralStats from "../GeneralStats";
import PowerUnitsBarChart from "../PowerUnitsBarChart";
import PivotTable from "../PivotTable";
import RecordTable from "../RecordTable";

import { DashboardRoot } from "./styles";

function Dashboard() {
    return (
        <DashboardRoot>
            <GeneralStats />
            <PowerUnitsBarChart />
            <PivotTable />
            <RecordTable />
        </DashboardRoot>
    );
}

export default Dashboard;
export { Dashboard };
