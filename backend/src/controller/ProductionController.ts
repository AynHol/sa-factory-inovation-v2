import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { productionService } from "../service/ProductionService";

export async function productionController(app: FastifyInstance) {
    app.post("/production/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateProductionType;

        try {
            await productionService.create(body);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.get("/production/noquality", async (_: FastifyRequest, reply: FastifyReply) => {
        try {
            const marks = await productionService.getNoQuality();
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.get("/production/:id/car", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        try {
            const marks = await productionService.getCar(id);
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });
}
