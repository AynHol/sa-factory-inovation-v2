import fastify from "fastify";
import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./config/swaggerConfig";
import fastifySwaggerUi from "@fastify/swagger-ui";
import authjwt from "./middleware/authjwt";
import { userController } from "./controller/UserController";
import { stockController } from "./controller/StockController";
import { markController } from "./controller/MarkController";
import { productionController } from "./controller/ProductionController";
import { qualityController } from "./controller/QualityController";

const app = fastify();

app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
});

app.register(fastifySwagger, swaggerConfig as any);
app.register(fastifySwaggerUi, { routePrefix: "/docs", uiConfig: { docExpansion: "list" } });

app.register(authjwt);
app.register(userController);
app.register(stockController);
app.register(markController);
app.register(productionController);
app.register(qualityController);

const PORT = 5500;
app.listen({ port: PORT }).then(() => {
    console.log(`Backend running in port: ${PORT}!`);
});
