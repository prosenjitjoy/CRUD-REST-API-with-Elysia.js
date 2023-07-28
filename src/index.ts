import { Elysia, t } from "elysia";
import TodoController from "./controller/controller"

const app = new Elysia()

app.post("/create", ({ body }) => TodoController.addTodo(body), {
    body: t.Object({
        title: t.String(),
        completed: t.Literal(false)
    })
})
app.get("/read", ({ query }) => TodoController.getTodos(query), {
    query: t.Object({
        limit: t.String(),
        offset: t.String()
    })
})
app.get("/read/:id", ({ params: { id } }) => TodoController.getTodoByID(id))
app.put("/update/:id", ({ params: { id } }) => TodoController.updateTodoByID(id))
app.delete("/delete/:id", ({ params: { id } }) => TodoController.removeTodoByID(id))

app.listen(3000);
console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
