import fastify from 'fastify';

export function buildApp() {
    const app = fastify();

    app.register(userRoutes);

    return app;
}

