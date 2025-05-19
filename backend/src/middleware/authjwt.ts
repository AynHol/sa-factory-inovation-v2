import { FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export default fp(async (fastify) => {
    fastify.register(require("fastify-jwt"), {
        secret: process.env.JWT_SECRET,
    });

    fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify();
        } catch (error) {
            return reply.status(401).send({ error: "Not Authorized" });
        }
    });
});