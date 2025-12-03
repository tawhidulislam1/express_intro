import { Request, Response } from "express";
import { todoServices } from "./todos.service";

const createTodos = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todoServices.createTodos(user_id, title);
    res.status(200).json({
      success: true,
      message: "Todos created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodos();

    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};
const singleTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.singleTodos(req.params.id!);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch todo" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title, completed } = req.body;

  try {
    const result = await todoServices.updateTodo(
      title,
      completed,
      req.params.id!
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
};
const deleteTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deleteTodo(req.params.id!);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ success: true, message: "Todo deleted", data: null });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
};
export const todosController = {
  createTodos,
  getTodos,
  updateTodo,
  deleteTodo,
};
