import DashboardSetup from "@models/DashboardSetup";
import { DashboardSetupRepository } from "../repositories";

async function getDashboardById(
    id: string
): Promise<DashboardSetup | undefined> {
    const dash = await DashboardSetupRepository.access().id(id).findOne();
    return dash;
}

export default getDashboardById;
export { getDashboardById };
