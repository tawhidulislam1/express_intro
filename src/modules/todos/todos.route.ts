import { Router } from "express";
import { todosController } from "./todos.controller";
const router = Router();

router.post("/", todosController.createTodos);
router.get("/", todosController.getTodos);
router.get("/:id", todosController.getTodos);
router.put("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

export const todosRouter = router;
