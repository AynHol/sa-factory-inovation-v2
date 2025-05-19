export const swaggerConfig = {
    openapi: {
        info: {
            title: "API Factory Inovation V2",
            description: "API da SA",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerformat: "JWT",
                },
            },
        },
    },
    exposeRoute: true,
};