import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./config/swaggerConfig";
import fastifySwaggerUi from "@fastify/swagger-ui";
import authjwt from "./middleware/authjwt";
import { userController } from "./controller/UserController";

const app = fastify();

app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.register(fastifySwagger, swaggerConfig as any);
app.register(fastifySwaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list'}})

app.register(authjwt)
app.register(userController)

const PORT = 5500;
app.listen({ port: PORT }).then(() => {
    console.log(`Backend running in port: ${PORT}!`);
});
