import { Stock } from "@prisma/client";
import { prisma } from "../prisma/client";

class StockService {
    public async create({ name, amount, description, category, markId }: CreateStockType): Promise<void> {
        const productExist = await prisma.stock.findUnique({ where: { name } });
        if (productExist) {
            throw new Error("Product Already Registered!");
        }
        const mark = prisma.mark.findUnique({ where: { id: markId } });
        if (!mark) {
            throw new Error("Mark Don't Exist!");
        }

        const product: Stock = {
            id: crypto.randomUUID(),
            name,
            amount,
            description,
            category,
            markId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await prisma.stock.create({ data: product });
    }

    public async getAll() {
        return await prisma.stock.findMany({
            include: {
                mark: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    public async updateAmount(id: string, amount: number) {
        const product = await prisma.stock.findUnique({ where: { id } });
        var ogAmount = 0;
        if (product) {
            ogAmount = product.amount;
        }
        const amountUpdate = {
            amount: ogAmount + amount,
            updatedAt: new Date(),
        };

        return await prisma.stock.update({ where: { id }, data: amountUpdate });
    }

    public async getEngine() {
        return await prisma.stock.findMany({ where: { category: "engine" } });
    }

    public async getTire() {
        return await prisma.stock.findMany({ where: { category: "tire" } });
    }
}

export const stockService = new StockService();
