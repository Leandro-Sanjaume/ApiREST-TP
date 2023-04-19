import { Router } from "express"
import { getCases, addCase, updateCase, deleteCase } from "../controller/index"

const router: Router = Router()

router.get("/infection", getCases)

router.post("/infection", addCase)

router.put("/infection/:id", updateCase)

router.delete("/infection/:id", deleteCase)

export default router