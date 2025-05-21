import { Stock } from "@prisma/client";
import { prisma } from "../prisma/client";

class StockService {
    public async create({ name, amount, description, markId }: CreateStockType): Promise<void> {
        const productExist = await prisma.stock.findUnique({ where: { name } });
        if (productExist) {
            throw new Error("Product Already Registered!");
        }
        const mark = prisma.mark.findUnique({ where: { id: markId } })
        if (!mark) {
            throw new Error("Mark Don't Exist!")
        }

        const product: Stock = {
            id: crypto.randomUUID(),
            name,
            amount,
            description,
            markId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await prisma.stock.create({ data: product });
    }

    public async getAll(): Promise<Stock[]> {
        return await prisma.stock.findMany();
    }

    public async updateAmount(id: string, amount: number) {
        const amountUpdate = {
            amount,
            updatedAt: new Date(),
        };

        return await prisma.stock.update({ where: { id }, data: amountUpdate });
    }
}

export const stockService = new StockService();
