import { ICase } from '../types/case'
import mongoose, { Schema, model } from 'mongoose'
import * as virusSchema from './virusSchema'

const caseSchema: Schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    caseVirus: {
      type: virusSchema,
      default: {},
      required: true,
    },
    caseDate : {
      type: Date,
      required: true,
    }, 
    age : {
      type: Number,
      required: true,
    }, 
    gender : {
      type: String,
      required: true,
    }, 
    location : {
      type: String,
      required: true,
    }, 
    subjectState : {
      type: String,
      required: true,
    }, 

  },
  {timestamps: false}
)

export default model<ICase>("Case", caseSchema)