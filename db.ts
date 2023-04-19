import * as mongoose from 'mongoose';

export class myDB {public static async initDB() {
    return mongoose.connect('mongodb://localhost:27017/local');
 }public static async closeCon() {
    return mongoose.connection.close(true);
 }}