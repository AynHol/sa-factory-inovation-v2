import { Quality } from "@prisma/client";
import { prisma } from "../prisma/client";

class QualityService {
    public async create(carId: string, data: QualityRequest): Promise<void> {
        const car = await prisma.production.findUnique({ where: { id: carId } });
        if (!car) {
            throw new Error("Car not found");
        }

        const quality: Quality = {
            id: crypto.randomUUID(),
            productionId: car.id,
            car: car.model,
            door: data.door,
            engine: data.engine,
            chassi: data.chassi,
            tire: data.tire,
            window: data.window,
            ligh: data.ligh,
            seat: data.seat,
            airbag: data.airbag,
            extra: data.extra,
            eletric: data.eletric,
            aproval: null,
            number: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await prisma.quality.create({ data: quality });
    }
}

export const qualityService = new QualityService();
