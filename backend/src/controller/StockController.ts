import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { stockService } from "../service/StockService";

export async function stockController(app: FastifyInstance) {
    app.post("/stock/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateStockType;

        try {
            await stockService.create(body);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ error: error.messsage });
        }
    });

    app.get("/stock", async (_, reply: FastifyReply) => {
        const list = await stockService.getAll();
        return reply.code(200).send(list);
    });

    app.patch("/stock/:id/amount", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const { amount, ogAmount } = request.body as { amount: number, ogAmount: number };
        try {
            const newAmount = await stockService.updateAmount(id, amount, ogAmount);
            return reply.code(200).send(newAmount);
        } catch (error: any) {
            return reply.code(404).send({ error: error.messsage });
        }
    });
}
