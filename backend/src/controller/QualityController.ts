import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { qualityService } from "../service/QualityService";

export async function qualityController(app: FastifyInstance) {

    app.post("/quality/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const { carId } = request.body as { carId: string };
        const body = request.body as QualityRequest;

        try {
            await qualityService.create(carId, body)
            return reply.code(200).send();
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })
}