"use client";
import { createContext, useState } from "react";


const DataContext = createContext({});

export const Dataprovider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [confirmedorder, setconfirmedorder] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [feedbackData, setFeedbackData] = useState([]);
  const [instructions, setInstructions] = useState("");


  return (
    <DataContext.Provider value={{
      order, setOrder, confirmedorder, tableNumber, setTableNumber, phoneNumber, setPhoneNumber, instructions, setInstructions,setconfirmedorder,feedbackData, setFeedbackData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
