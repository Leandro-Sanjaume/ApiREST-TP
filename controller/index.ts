import { Response, Request } from "express"
import { ICase } from '../types/case';
import { IVirus } from '../types/virus';
import modelCase from '../models/caseSchema';

import { getRandomValues, randomInt } from "crypto";


function mongoArrayParser(unparsedCases : ICase[]) {
  const Showcases: ICase[] = []
  unparsedCases.forEach(auxcase => {
        //@ts-ignore
        const {_id, __v, ...indiCase} = auxcase._doc
        //@ts-ignore
        Showcases.push(indiCase)
      })
  return Showcases    
}

function mongoCaseParser(unparsedCase : ICase){
  //@ts-ignore
  const {_id, __v, ...ShowCase} = unparsedCase._doc 
  return ShowCase
}


const getCases = async (req: Request, res: Response): Promise<void> => {
    try {
      const cases: ICase[] = await modelCase.find()
      res.status(200).json(mongoArrayParser(cases))
    } catch (error) {
      throw error
    }
  }

  const getCaseById = async (req: Request, res: Response): Promise<void> => {
    try {
      const singleCase: ICase | null = await modelCase.findOne({
        id : req.params.id 
    })
      if(singleCase != null) res.status(200).json(mongoCaseParser(singleCase))
      else res.sendStatus(404) 
    } catch (error) {
      throw error
    }
  } 
  

  const addCase = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as 
      Pick<ICase, "id" | "caseVirus" | "caseDate" | "age" | "gender" | "location" | "subjectState">

      const Case: ICase = await modelCase.create({
        id: randomInt(1,500),
        caseVirus: body.caseVirus,
        caseDate: body.caseDate,
        age: body.age,
        gender: body.gender,
        location: body.location,
        subjectState: body.subjectState,
      })
  
      const newCase: ICase = await Case.save()
      res.status(201).json(mongoCaseParser(newCase))
    } catch (error) {
      throw error
    }

  }

  const updateCase = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedCase: ICase | null = await modelCase.findOneAndUpdate(
        { id: req.params.id },
        req.body, {new: true}
      )
      if(updatedCase != null) res.status(200).json(mongoCaseParser(updatedCase))
      else res.sendStatus(404)
    } catch (error) {
      throw error
    }
  }

  const updateVirus = async (req: Request, res: Response): Promise<void> => {
    try {
      const singleVirus: ICase | null = await modelCase.findOneAndUpdate(
        { id: req.params.id },
        req.body.caseVirus, {new: true}
      )
      if(singleVirus != null) res.status(200).json(mongoCaseParser(singleVirus))
      else res.sendStatus(404)
    } catch (error) {
      throw error
    }
  }

  const deleteCase = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedCase: ICase | null = await modelCase.findOneAndRemove({
        id : req.params.id 
    })
      if(deletedCase != null) res.sendStatus(200).json(mongoCaseParser(deletedCase))
      else res.sendStatus(404)
    } catch (error) {
      throw error
    }
  }
  
  

  export { getCases, getCaseById, addCase, updateCase, updateVirus, deleteCase }
  