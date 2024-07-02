"use client"
import { createContext, useState } from "react";

const DataContext = createContext({});

export const Dataprovider = ({ children }) => {
    const [order, setOrder] = useState([]);
    const [confirmedorder, setconfirmedorder] = useState([]);
    const [tableNumber, setTableNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [instructions, setinstructions] = useState("");
    const [status, setStatus] = useState(false);
    const [status1, setStatus1] = useState(false);

    return (
        <DataContext.Provider value={{ 
            order, setOrder,confirmedorder,setconfirmedorder,tableNumber, setTableNumber,phoneNumber, setPhoneNumber,instructions,setinstructions,
            status, setStatus,
            status1, setStatus1 
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;
