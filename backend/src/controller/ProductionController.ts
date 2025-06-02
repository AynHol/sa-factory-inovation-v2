import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productionService } from "../service/ProductionService";

export async function modelController(app: FastifyInstance) {
    app.post("/production/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateProductionType;

        try {
            await productionService.create(body);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.get("/production", async (_: FastifyRequest, reply: FastifyReply) => {
        try {
            const marks = await productionService.getAll();
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });
}
