import { Production, Quality } from "@prisma/client";
import { prisma } from "../prisma/client";

class ProductionService {
    public async create({ model, engineId, amount, door, colour, tireId, airbag, pc, gear }: CreateProductionType): Promise<void> {
        const products = await prisma.stock.findMany({ where: { id: { in: [tireId, engineId] } } });

        if (products.length != 2) {
            throw new Error("One of the id's is incorrect!");
        }

        const engine = products.find((item) => item.category === "engine");
        const tire = products.find((item) => item.category === "tire");
        if (!engine || !tire) {
            throw new Error("Required products not found");
        }

        const enoughProducts = engine.amount < amount && tire.amount < 5 * amount;
        if (enoughProducts) {
            throw new Error("There are not enough products for this number of vehicles");
        }

        const car: Production = {
            id: crypto.randomUUID(),
            model,
            amount,
            door,
            colour,
            airbag,
            pc,
            gear,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await prisma.$transaction([
            prisma.production.create({ data: car }),
            prisma.stockProduction.createMany({
                data: [
                    { productionId: car.id, stockId: engineId },
                    { productionId: car.id, stockId: tireId },
                ],
            }),
            prisma.stock.update({ where: { id: engine.id }, data: { amount: { decrement: amount } } }),
            prisma.stock.update({ where: { id: tire.id }, data: { amount: { decrement: 5 * amount } } }),
        ]);
    }

    public async getNoQuality(): Promise<Production[]> {
        return await prisma.production.findMany({
            include: {
                Quality: false,
            },
        });
    }

    public async getCar(id: string) {
        const car = await prisma.production.findUnique({ where: { id } });
        if (car == null) {
            throw new Error("Vehicle Don't Exist.");
        }
        return car.model;
    }
}

export const productionService = new ProductionService();
