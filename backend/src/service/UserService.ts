import { User } from "@prisma/client";
import { prisma } from "../prisma/client";
import { compare, hash } from "bcryptjs";
import { FastifyInstance } from "fastify";

class UserService {
    public async register({ name, email, password }: CreateUserType): Promise<void> {
        const userExist = await prisma.user.findUnique({ where: { email: email } });
        if (userExist) {
            throw new Error("Email Already Registered!");
        }

        const passwordHashed = await hash(password, 10);

        const user: User = {
            id: crypto.randomUUID(),
            name,
            email,
            devMode: false,
            avatar: "https://github.com/Henry18if.png",
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

    public async updateDev(id: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (user == null) {
            throw new Error("User Don't Exist.");
        }

        const devUpdate = {
            devMode: !user.devMode,
            updatedAt: new Date(),
        };

        return await prisma.user.update({
            where: { id },
            data: devUpdate,
        });
    }

    public async updateAvatar(id: string, avatar: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (user == null) {
            throw new Error("User Don't Exist.");
        }

        const avatarUpdate = {
            avatar,
            updatedAt: new Date(),
        };

        return await prisma.user.update({
            where: { id },
            data: avatarUpdate,
        });
    }

    public async getAvatar(id: string) {
        const user = await prisma.user.findUnique({ where: { id } });
        if (user == null) {
            throw new Error("User Don't Exist.");
        }
        return user.avatar;
    }
}

export const userService = new UserService();
