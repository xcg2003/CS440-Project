import { buildApp } from "./app.js";

const app = buildApp();

app.listen({ port: 3003, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
