require("dotenv").config();
const supabase = require("./services/supabase");
const fastify = require("fastify")({ logger: true });

// Declare a route
fastify.get("/", async (request, reply) => {
  const { data: bookings, error } = await supabase.from("bookings").select("*");

  return { bookings };
});

// Run the server!
const PORT = 8000;
const HOST = "0.0.0.0";

const start = async () => {
  try {
    await fastify.listen({ host: HOST, port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
