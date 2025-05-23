import { Production } from "@prisma/client";
import { prisma } from "../prisma/client";

class ProductionService {
    public async create({ model, engineId, amount, door, colour, tireId, airbag, pc, gear }: CreateProductionType): Promise<void> {
        const products = await prisma.stock.findMany({where: {id: engineId}})

        const car: Production = {
            id: crypto.randomUUID(),
            model,
            engineId,
            amount,
            door,
            colour,
            tireId,
            airbag,
            pc,
            gear,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await prisma.$transaction{[
            prisma.production.createMany({data: }),
            prisma.stock.update({where: {}})
        ]}
    }

    public async getAll(): Promise<Production[]> {
        return await prisma.production.findMany();
    }
}

export const productionService = new ProductionService();
