import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualityService } from "../service/QualityService";

export async function qualityController(app: FastifyInstance) {

    app.patch("/quality/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as QualityRequest;
        const { id } = request.params as { id: string };

        try {
            await qualityService.create(id, body)
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })
}