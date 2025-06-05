import { Quality } from "@prisma/client";
import { prisma } from "../prisma/client";
import { aQuality, calculateQuality, resumeQuality } from "../util/calculateQuality";

class QualityService {
    public async create(carId: string, data: QualityRequest): Promise<void> {
        const car = await prisma.production.findUnique({ where: { id: carId } });
        if (!car) {
            throw new Error("Car not found");
        }

        const number = calculateQuality(data);
        const resume = resumeQuality(data);
        const aproval = aQuality(data);

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
            aproval,
            number,
            resume,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await prisma.quality.create({ data: quality });
    }

    public async getResult(id: string) {
        const result = await prisma.quality.findUnique({ where: { productionId: id } });
        if (result == null) {
            throw new Error("QA Don't Exist.");
        }
        return result;
    }

    public async getAll() {
        const result = await prisma.quality.findMany();
        return result;
    }
}

export const qualityService = new QualityService();
