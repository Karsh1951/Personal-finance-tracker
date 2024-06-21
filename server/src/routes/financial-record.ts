import express, {Request, Response } from "express";
//to make any data base operations
import FinancialRecordModel from "../schema/financial-record";

// we want to define a router/routes
const router = express.Router();
//we want to query all the users expenses
router.get("/getAllByUserId/:userId", async (req:Request, res:Response) =>{
    //try is used to find all the financial records 
    try{
        const userId =req.params.userId;
        const records= await FinancialRecordModel.find({userId:userId});
//an empty record
        if(records.length===0) {
            return res.status(404).send("No records found for the user.");
        }
        res.status(200).send(records);

    }  catch(err) {
        res.status(500).send(err);
    }
});

//easiet way to send data from front end to back end is to use params(user/id)

//adding a new record

router.post("/", async (req: Request, res: Response) => {
    try {
    const newRecordBody = req.body;
    const newRecord = new FinancialRecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(200).send(savedRecord);
    } catch (err) {
    
        res.status(500).send(err);
    }
    });


//UPDATING THE RECORD(PUT REQUEST)
router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const newRecordBody = req.body;
        const record = await FinancialRecordModel.findByIdAndUpdate(
        id,
        newRecordBody,
        { new: true }
    );

    if (!record) return res.status(404).send();

        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
    });

//delete

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const record = await FinancialRecordModel.findByIdAndDelete(id);
        if (!record) return res.status(404).send();
        res.status(200).send(record);
    } catch (err) {
        res.status(500).send(err);
    }
    });

export default router;
