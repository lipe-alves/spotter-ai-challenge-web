import DashboardSetup from "@models/DashboardSetup";
import { DashboardSetupRepository } from "../repositories";
import getLocalAuthId from "./getLocalAuthId";

async function listMyDashboards(): Promise<DashboardSetup[]> {
    const authId = await getLocalAuthId();
    if (!authId) throw new Error("You are not authenticated!");
    const list = await DashboardSetupRepository.access()
        .where("createdBy", "==", authId)
        .list();
    return list;
}

export default listMyDashboards;
export { listMyDashboards };
