import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualityService } from "../service/QualityService";

export async function qualityController(app: FastifyInstance) {
    app.post("/quality/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const { carId } = request.body as { carId: string };
        const body = request.body as QualityRequest;

        try {
            await qualityService.create(carId, body);
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.get("/quality/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        try {
            const marks = await qualityService.getResult(id);
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.get("/quality/:id/car", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        try {
            const marks = await qualityService.getCar(id);
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.patch("/quality/:id/update", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const body = request.body as QualityRequest;

        try {
            await qualityService.update(id, body);
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.get("/quality/fail", async (_: FastifyRequest, reply: FastifyReply) => {
        try {
            const marks = await qualityService.getFail();
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.get("/quality/all", async (_: FastifyRequest, reply: FastifyReply) => {
        try {
            const marks = await qualityService.getAll();
            return reply.code(200).send(marks);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });
}
