import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

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
}
