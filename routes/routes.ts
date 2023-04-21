import { Router } from "express"
import { getCases, getCaseById, addCase, updateCase, updateVirus, deleteCase, getCasesByVirus, 
    getCasesByAge, virusHasVaccine } from "../controller/index"

const router: Router = Router()

router.get("/infection", getCases)

router.get("/infection/:id", getCaseById)

router.post("/infection", addCase)

router.put("/infection/:id", updateCase)

router.patch("/infection/:id", updateVirus)

router.delete("/infection/:id", deleteCase)

router.get("/infection/virus/:sciName", getCasesByVirus)

router.get("/infection/case/:age",getCasesByAge)

router.get("/infection/virus/:sciName/vaccine", virusHasVaccine)


export default router