import { Document } from "mongoose";
import { IVirus } from "./virus";

export interface ICase extends Document{
    id: number
    caseVirus : {
        sciName : String;
        virusType : String;
        hasVaccine : Boolean;
    }
    caseDate : Date
    age : number
    gender : String
    location : String
    subjectState : String
}
