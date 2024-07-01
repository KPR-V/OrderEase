"use client"
import { createContext } from "react";
import { useState } from "react";
const DataContext = createContext({});
export const Dataprovider = ({ children }) => {
    const [order, setOrder] = useState([]);
    const [confirmedorder, setconfirmedorder] = useState([]);
    const [tableNumber, setTableNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('')
    const [instructions,setinstructions] = useState('')
    return (
        <DataContext.Provider value={{ order, setOrder,confirmedorder,setconfirmedorder,tableNumber, setTableNumber,phoneNumber, setPhoneNumber,instructions,setinstructions }}>
            {children}
        </DataContext.Provider>
    );
}
export default DataContext