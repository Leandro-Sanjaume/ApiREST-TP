import { Router } from "express"
import { getCases, addCase, updateTodo, deleteTodo } from "../controller/index"

const router: Router = Router()

router.get("/todos", getCases)

router.post("/add-todo", addCase)

router.put("/edit-todo/:id", updateTodo)

router.delete("/delete-todo/:id", deleteTodo)

export default router