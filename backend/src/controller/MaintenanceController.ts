import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { maintenanceService } from "../service/MaintenanceService";

export async function maintenanceController(app: FastifyInstance) {
    app.post("/maintenance/:id/create", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };

        try {
            await maintenanceService.create(id);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(409).send({ error: error.messsage });
        }
    });

    app.get("/maintenance", async (_, reply: FastifyReply) => {
        const marks = await maintenanceService.getAll();
        return reply.code(200).send(marks);
    });
}
