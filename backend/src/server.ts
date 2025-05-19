import fastify from "fastify";
import cors from "@fastify/cors";

const app = fastify();

app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
});

const PORT = 5500;
app.listen({ port: PORT }).then(() => {
    console.log(`Backend running in port: ${PORT}!`);
});
