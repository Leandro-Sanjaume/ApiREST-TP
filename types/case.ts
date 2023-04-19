import { Document } from "mongoose";
import { IVirus } from "./virus";

export interface ICase extends Document{
    id: number
    caseVirus : IVirus
    caseDate : Date
    age : number
    gender : String
    location : String
    subjectState : String
}
