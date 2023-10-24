import { randomUUID } from "node:crypto";
import { sql } from "./db.js";
export class DataBasePostgres {
  #todos = new Map();

  async list(search) {
    let todos;
    if (search) {
      todos = await sql`select * from todos where title ilike ${"%" + search}`;
    } else {
      todos = await sql`select * from todos`;
    }
    return todos;
  }

  async create(todo) {
    const todoId = parseFloat(randomUUID());
    const { title, completed } = todo;
    await sql`insert into todos(id, title, completed) VALUES (${todoId}, ${title}, ${completed})`;
  }

  async update(id, todo) {
    const { title, completed } = todo;
    await sql`update todos set title = ${title}, completed = ${completed} WHERE id = ${id}`;
  }

  async delete(id) {
    // const { title, completed } = todo;
    await sql`delete from todos WHERE id = ${id}`
  }
}
