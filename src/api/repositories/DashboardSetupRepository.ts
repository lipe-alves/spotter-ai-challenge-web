import { DashboardSetup } from "@models";
import { Database } from "../databases";

class DashboardSetupRepository extends Database<DashboardSetup> {
    public constructor() {
        super(DashboardSetup.create, "dashboard-setups");
    }

    public static override access(): DashboardSetupRepository {
        return new DashboardSetupRepository();
    }
}

export default DashboardSetupRepository;
export { DashboardSetupRepository };
