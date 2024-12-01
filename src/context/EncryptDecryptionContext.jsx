import React, { createContext, useState } from "react";

export const EDContext = createContext() ;

const EDProvider = ({children}) => {

    // Define and initialize state variables
    const [text, setText] = useState(""); // User input text
    const [screen, setScreen] = useState("encrypt"); // Screen mode: encrypt or decrypt
    const [encrptedData, setEncrptedData] = useState(""); // Encrypted data
    const [decrptedData, setDecrptedData] = useState(""); // Decrypted data
    const [errorMessage, setErrorMessage] = useState(""); // Error message if any
    const [copyMessage, setCopyMessage] = useState(""); // copy to clipboard

    const value = {
        text , setText ,
        screen , setScreen ,
        encrptedData , setEncrptedData ,
        decrptedData , setDecrptedData ,
        errorMessage ,setErrorMessage ,
        copyMessage ,setCopyMessage
    };

    return(
        <EDContext.Provider value={value}>
            {children}
        </EDContext.Provider>
    )
} ;

export default EDProvider ;