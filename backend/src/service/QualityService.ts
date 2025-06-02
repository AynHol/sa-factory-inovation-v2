import { prisma } from "../prisma/client";

class QualityService {
    public async create(id: string, data: QualityRequest): Promise<void> {
        const available = await prisma.quality.findUnique({ where: { id } });
        if (!available) {
            throw new Error("Avaliação não existe...")
        }

        const updatedQuality = {
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
            updatedAt: new Date()
        }

        await prisma.quality.update({ where: { id }, data: updatedQuality })
    }
}

export const qualityService = new QualityService();