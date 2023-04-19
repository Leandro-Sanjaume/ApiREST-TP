import { getRandomValues, randomInt } from "crypto";
import { Virus } from "./virus";

export class Case{
    id: number
    caseVirus : Virus
    caseDate : Date
    age : number
    gender : String
    location : String
    subjectState : String

    constructor(objCase : Case){
        this.id = randomInt(1,500);
        this.caseVirus = Virus.fromJson(JSON.stringify(objCase.caseVirus));
        this.caseDate = objCase.caseDate;
        this.age = objCase.age;
        this.gender = objCase.gender;
        this.location = objCase.location;
        this.subjectState = objCase.subjectState;
    }
}