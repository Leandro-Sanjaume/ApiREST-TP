import * as mongoose from 'mongoose';

export class myDB {public static async initDB() {
   return mongoose.connect('mongodb://127.0.0.1:27017/local');
}public static async closeCon() {
   return mongoose.connection.close(true);
 }}