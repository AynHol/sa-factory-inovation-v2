import { User } from "@prisma/client";
import { prisma } from "../prisma/client";
import { compare, hash } from "bcryptjs";
import { FastifyInstance } from "fastify";

class UserService {
    public async register({ name, email, password}: CreateUserType): Promise<void> {
        const userExist = await prisma.user.findUnique({ where: { email: email } });
        if (userExist) {
            throw new Error("Email Already Registered!");
        }

        const passwordHashed = await hash(password, 10);

        const user: User = {
            id: crypto.randomUUID(),
            name,
            email,
            password: passwordHashed,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        await prisma.user.create({ data: user });
    }

    public async login({ email, password }: LoginType, app: FastifyInstance): Promise<string | null> {
        const user = await prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            throw new Error("Invalid Credentials");
        }

        const passwordIsValid = await compare(password, user.password);
        if (!passwordIsValid) {
            throw new Error("Invalid Credentials");
        }

        return app.jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }
}

export const userService = new UserService();