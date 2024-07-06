"use client";
import { createContext, useState } from "react";


const DataContext = createContext({});

export const Dataprovider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [confirmedorder, setconfirmedorder] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foodQuality, setFoodQuality] = useState('');
  const [serviceQuality, setServiceQuality] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [value, setValue] = useState('');
  const [experience, setExperience] = useState('');
  const [feedbackData, setFeedbackData] = useState([]);
  const [comments, setComments] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instructions, setInstructions] = useState("");


  return (
    <DataContext.Provider value={{
      order, setOrder, confirmedorder, tableNumber, setTableNumber, phoneNumber, setPhoneNumber, instructions, setInstructions,setconfirmedorder,
      foodQuality, setFoodQuality, serviceQuality, setServiceQuality, cleanliness, setCleanliness, value, setValue, experience, setExperience, comments, setComments, name, setName, email, setEmail,feedbackData, setFeedbackData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
