export const loginSchema = {
    body: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { type: "string", format: "email" },
            password: { type: "string" },
        },
    },
    tags: ["Auth"],
    summary: "Endpoint to login in",
};

export const registerSchema = {
    body: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            password: { type: "string" },
        },
    },
    tags: ["Auth"],
    summary: "Endpoint to sign in",
};

export const devSchema = {
    body: {
        type: "object",
        required: ["devMode"],
        properties: {
            devMode: { type: "boolean" },
        },
    },
    tags: ["Auth"],
    summary: "Endpoint to change dev mode",
};

export const avatarSchema = {
    body: {
        type: "object",
        required: ["avatar"],
        properties: {
            devMode: { type: "string" },
        },
    },
    tags: ["Auth"],
    summary: "Endpoint to change avatar",
};