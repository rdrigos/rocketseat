const dotenv = require("dotenv");
const path = require("node:path");
const z = require("zod");

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const environmentSchema = z.object({
  PORT: z.coerce.number().min(80).max(65535),
  DATABASE_HOST: z.string().min(4),
  DATABASE_PORT: z.coerce.number().min(80).max(65535),
  DATABASE_USER: z.string().min(4),
  DATABASE_PASS: z.string().min(4),
  DATABASE_NAME: z.string().min(4),
});

const env = environmentSchema.parse(process.env);

module.exports = { env };
