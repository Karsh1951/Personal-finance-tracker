import mongoose from "mongoose";
//how we want our record to look like
interface FinancialRecord {
    userID:string;
    date:Date;
    description:string;
    amount:number;
    category:string;
    paymentMethod:string;
}
//actual layout in the data base and pass in the interface
//Define the description in the mongodb way

const financialRecordSchema = new mongoose.Schema<FinancialRecord>({
    userID: {type:String, required:true},
    date: {type:Date, required:true},
    description: {type:String, required:true},
    amount: {type:Number, required:true},
    category: {type:String, required:true},
    paymentMethod: {type:String, required:true}


});

//we want to define the schema and create a model out of the schema
const FinancialRecordModel= mongoose.model<FinancialRecord>(
    "FinancialRecord",
    financialRecordSchema
);

export default FinancialRecordModel;