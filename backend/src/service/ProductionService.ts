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
            throw new Error("Não existe produtos suficientes para essa quantidade de modelos");
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

        const quality: Quality = {
            id: crypto.randomUUID(),
            productionId: car.id,
            car: car.model,
            door: null,
            engine: null,
            chassi: null,
            tire: null,
            window: null,
            ligh: null,
            seat: null,
            airbag: null,
            extra: null,
            eletric: null,
            aproval: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await prisma.$transaction([
            prisma.production.create({ data: car }),
            prisma.quality.create({ data: quality }),
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

    public async getAll(): Promise<Production[]> {
        return await prisma.production.findMany();
    }
}

export const productionService = new ProductionService();
