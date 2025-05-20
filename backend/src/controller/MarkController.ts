import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { markService } from "../service/MarkService";

export async function markController(app: FastifyInstance) {
    app.addHook("onRequest", app.authenticate);

    app.post("/mark", async (request: FastifyRequest, reply: FastifyReply) => {
        const { name } = request.body as { name: string };

        try {
            await markService.create(name);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(409).send({ error: error.messsage });
        }
    });
}
