import { buildApp } from "./app.js";
import * as dotenv from 'dotenv';
dotenv.config();

const app = buildApp();

app.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
});
