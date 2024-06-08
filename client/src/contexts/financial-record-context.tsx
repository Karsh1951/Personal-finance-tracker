import { createContext } from "react";

interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
  }

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;//A function that is empty that we pass in the new record we want to add
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
  }

export const FinancialRecordsContext= createContext<FinancialRecordsContextType | undefined>(undefined);

//create a component that will be a provider


