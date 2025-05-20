import { Mark } from "@prisma/client";
import { prisma } from "../prisma/client";

class MarkService {
    public async create(name: string): Promise<void> {
        const markExist = await prisma.mark.findUnique({ where: { name } });
        if (markExist) {
            throw new Error("Mark Already Registered!");
        }

        const mark: Mark = {
            id: crypto.randomUUID(),
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await prisma.mark.create({ data: mark });
    }
}

export const markService = new MarkService();
