import { DashboardSetupRepository } from "../repositories";

import getLocalAuthId from "./getLocalAuthId";
import getDashboardById from "./getDashboardById";

async function deleteDashboard(id: string) {
    const existingDash = await getDashboardById(id);
    if (!existingDash) throw new Error("Dashboard not found");

    const authId = await getLocalAuthId();
    if (!authId) throw new Error("You are not authenticated!");

    if (authId !== existingDash.createdBy)
        throw new Error("You're not allowed to update this dashboard");

    await DashboardSetupRepository.access().id(id).delete();
}

export { deleteDashboard };
