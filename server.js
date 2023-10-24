import { fastify } from "fastify";
// import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";

const server = fastify();
const database = new DataBasePostgres();

server.post("/todo", async (req, res) => {
  //request body
  const { title, completed } = req.body;

  await database.create({
    title,
    completed,
  });

  return res.status(201).send;
});

server.get("/todos", async (req, res) => {
  const search = req.query.search;
  // console.log(search)
  const todos = await database.list(search);
  return todos;
});

server.put("/todo/:id", async (req, res) => {
  //request body
  const todoId = req.params.id;
  const { title, completed } = req.body;

  await database.update(todoId, {
    title,
    completed,
  });

  return res.status(204).send;
});

server.delete("/todo/:id", async (req, res) => {
  const todoId = req.params.id;
  await database.delete(todoId);
  return res.status(204).send;
});

server.listen({
  host:'0.0.0.0',
  port: process.env.PORT ?? 3333,
});
