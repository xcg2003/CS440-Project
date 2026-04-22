import { buildApp } from "./app.js";

const app = buildApp();

app.listen({ port: 3002, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Book Library Service listening at ${address}`);
});
