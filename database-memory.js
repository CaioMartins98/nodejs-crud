import { randomUUID } from "node:crypto";
export class DataBaseMemory {
  #todos = new Map();

  list(search) {
    return Array.from(this.#todos.entries())
      .map((item) => {
        const id = item[0];
        const data = item[1];
        return {
          id,
          ...data,
        };
      })
      .filter((todo) => {
        if (search) {
          return todo.title.includes(search);
        }
        return true;
      });
  }

  create(todo) {
    const todoId = randomUUID();
    this.#todos.set(todoId, todo);
  }

  update(id, todo) {
    this.#todos.set(id, todo);
  }

  delete(id) {
    this.#todos.delete(id);
  }
}
