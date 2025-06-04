import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { markService } from "../service/MarkService";

export async function markController(app: FastifyInstance) {
    app.addHook("onRequest", app.authenticate);

    app.post("/mark/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const { name } = request.body as { name: string };

        try {
            await markService.create(name);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(409).send({ error: error.messsage });
        }
    });

    app.get("/mark", async (_, reply: FastifyReply) => {
        const marks = await markService.getAll();
        return reply.code(200).send(marks);
    });

    app.get("/mark/:id/mark", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const marks = await markService.getMark(id);
        return reply.code(200).send(marks);
    });
}
