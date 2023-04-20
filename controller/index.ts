import { Response, Request } from "express"
import { ICase } from '../types/case';
import { IVirus } from '../types/virus';
import caseSchema from '../models/caseSchema';
import virusSchema from '../models/virusSchema';
import { getRandomValues, randomInt } from "crypto";

const getCases = async (req: Request, res: Response): Promise<void> => {
    try {
      const cases: ICase[] = await caseSchema.find()
      res.status(200).json({ cases })
    } catch (error) {
      throw error
    }
  }

  const addCase = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as 
      Pick<ICase, "id" | "caseVirus" | "caseDate" | "age" | "gender" | "location" | "subjectState">
  
      const Case: ICase = new caseSchema({
        id: randomInt(1,500),
        caseVirus: body.caseVirus,
        caseDate: body.caseDate,
        age: body.age,
        gender: body.gender,
        location: body.location,
        subjectState: body.subjectState,
      })
  
      const newCase: ICase = await Case.save()
    
      res
        .status(201)
        .json({ message: "Case added", Case: newCase})
    } catch (error) {
      throw error
    }

  }

  const updateCase = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateTodo: ICase | null = await caseSchema.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allTodos: ICase[] = await caseSchema.find()
      res.status(200).json({
        message: "Todo updated",
        todo: updateTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
  }

  const deleteCase = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedTodo: ICase | null = await caseSchema.findByIdAndRemove(
        req.params.id
      )
      const allTodos: ICase[] = await caseSchema.find()
      res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
  }
  
  

  export { getCases, addCase, updateCase, deleteCase }
  