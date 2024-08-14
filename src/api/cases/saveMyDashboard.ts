import DashboardSetup from "@models/DashboardSetup";
import { DashboardSetupRepository } from "../repositories";

import getLocalAuthId from "./getLocalAuthId";
import getDashboardById from "./getDashboardById";

async function saveMyDashboard(data: Partial<DashboardSetup>) {
    const dashboard = DashboardSetup.create(data);

    const existingDash = await getDashboardById(dashboard.id);
    const alreadyExists = !!existingDash;

    if (!alreadyExists) {
        const authId = await getLocalAuthId();
        if (!authId) throw new Error("You are not authenticated!");

        dashboard.createdAt = new Date();
        dashboard.createdBy = authId;
        dashboard.saved = true;
        dashboard.savedAt = new Date();

        await DashboardSetupRepository.access()
            .id(dashboard.id)
            .create(dashboard);
    } else {
        await DashboardSetupRepository.access()
            .id(dashboard.id)
            .update({
                ...existingDash,
                ...data,
                savedAt: new Date(),
            });
    }

    return dashboard;
}

export { saveMyDashboard };
