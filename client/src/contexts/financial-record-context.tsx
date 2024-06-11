import { createContext, useContext, useState } from "react";

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
    //updateRecord: (id: string, newRecord: FinancialRecord) => void;
   // deleteRecord: (id: string) => void;
  }

export const FinancialRecordsContext= createContext<FinancialRecordsContextType | undefined>(undefined);

//create a component that will be a provider
export const FinancialRecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //we want to create the rrecord state
  const [records, setRecords]=useState<FinancialRecord[]>([]);

  const addRecord = async(record: FinancialRecord) =>{
    const response= await fetch("http://localhost:3001/financial-records", {
      method:"POST", 
      body: JSON.stringify(record),
      headers: {
        "content-Type": "application/json"
      },
    });
    try {

    
    if(response.ok) {
      const newRecord= await response.json();
      setRecords((prev)=>[...prev, newRecord]);
    }

    }catch(err) {

    }
  };
return (
  <FinancialRecordsContext.Provider value={{records,addRecord}}>
  {""}
  {children}
  </FinancialRecordsContext.Provider>
);
};

//WE WANT TO CREATE A CUSTOM HOOK THAT WILL GRAB THE CONTEXT ALREADY CREATED IN THE FILE
export const useFinancialRecords= ()=> {
  const context = useContext<FinancialRecordsContextType | undefined>(
    FinancialRecordsContext
  );
  if(!context){
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }
  return context;
}

