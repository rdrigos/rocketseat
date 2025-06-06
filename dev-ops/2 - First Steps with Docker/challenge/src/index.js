const { env } = require("./environment");
const { pool } = require("./database");
const fastify = require("fastify");

const app = fastify({ logger: true });

app.get("/", async (_, reply) => {
  let client;

  try {
    client = await pool.connect();

    const { rows } = await client.query("SELECT NOW()");

    reply.status(200).send({ time: rows[0].now });
  } catch (error) {
    reply.log.error(error);
    reply.status(500).send({ message: error.message });
  } finally {
    if (client) client.release();
  }
});

app.listen({ host: "0.0.0.0", port: env.PORT });

process.on("beforeExit", async () => {
  await pool.end();
  process.exit(0);
});
