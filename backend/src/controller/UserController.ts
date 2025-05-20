import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userService } from "../service/UserService";
import { avatarSchema, devSchema, loginSchema, registerSchema } from "../config/schema/auth.schema";

export async function userController(app: FastifyInstance) {
    app.post("/user/register", { schema: registerSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as CreateUserType;

        try {
            await userService.register(body);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(400).send({ error: error.messsage });
        }
    });

    app.post("/user/login", { schema: loginSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
        const body = request.body as LoginType;

        try {
            const token = await userService.login(body, app);
            return reply.code(200).send({ access_token: token });
        } catch (error: any) {
            return reply.code(401).send({ error: error.messsage });
        }
    });

    app.patch("/user/:id/dev", { schema: devSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        try {
            const dev = await userService.updateDev(id);
            return reply.code(200).send(dev);
        } catch (error: any) {
            return reply.code(404).send({ error: error.messsage });
        }
    });

    app.patch("/user/:id/avatar", { schema: avatarSchema }, async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const { avatar } = request.body as { avatar: string };
        try {
            const pfp = await userService.updateAvatar(id, avatar);
            return reply.code(200).send(pfp);
        } catch (error: any) {
            return reply.code(404).send({ error: error.messsage });
        }
    });

    app.get("/user/:id/avatar", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string };
        const pfp = await userService.getAvatar(id);
        return reply.code(200).send(pfp);
    });
}
