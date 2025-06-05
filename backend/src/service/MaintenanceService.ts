import { Maintenance } from "@prisma/client";
import { prisma } from "../prisma/client";

class MaintenanceService {
    public async create(qualityId: string): Promise<void> {
        const QAExist = await prisma.quality.findUnique({ where: { id: qualityId } });
        if (!QAExist) {
            throw new Error("QA don't Exist.");
        }

        const maintenance: Maintenance = {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            updatedAr: new Date(),
            qualityId,
        };
        await prisma.maintenance.create({ data: maintenance });
    }

    public async getAll() {
        return await prisma.maintenance.findMany();
    }
}

export const maintenanceService = new MaintenanceService();
