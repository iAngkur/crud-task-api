import mongoose from "mongoose";

export default async function databaseConnection(DB_URL, DBNNAME) {
   try{
    await mongoose.connect(DB_URL, {
        dbName: DBNNAME
    });
    console.log('Database connected successfully');
   } catch(err) {
        console.log(err);
   }   
}