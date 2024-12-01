import React, { useContext, useState } from "react";
import CryptoJS from "crypto-js";
import { EDContext } from "../context/EncryptDecryptionContext";


const SECRET_PASS = "XkhZG4fW2t2W";

function EncryptDecrypt() {

  const {
    text , 
    setText , 
    screen ,
    setScreen ,
    encrptedData ,
    setEncrptedData ,
    decrptedData ,
    setDecrptedData ,
    errorMessage ,
    setErrorMessage ,
    copyMessage ,
    setCopyMessage

  } = useContext(EDContext) ;

  // Encrypt user input text
  const encryptData = () => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString();
      setEncrptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Encryption failed. Please check your input.");
    }
  };

  // Decrypt user input text
  const decryptData = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecrptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed. Please check your input.");
    }
  };

  // Switch between encrypt and decrypt screens
  const switchScreen = (type) => {
    // Clear all data and error message when switching screens
    setText("");
    setEncrptedData("");
    setDecrptedData("");
    setErrorMessage("");
    setScreen(type);
  };

  // Handle button click (Encrypt or Decrypt)
  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter some text.");
      return;
    }

    if (screen === "encrypt") {
      encryptData();
    } else {
      decryptData();
    }
  };

  const copyToClipboard = () => {
    if(encryptData){
      navigator.clipboard.writeText(encrptedData).then(() => {
        setCopyMessage("Text Copied To ClipBoard");
        setTimeout(() => setCopyMessage("") , 2000) ;
      })
    }
  }

  return (
    <div className="container">
    <div className="container-child">
      <h1>ENCRYPTION AND DECRYPTION</h1>
    </div>
    <div>
      {/* Buttons to switch between Encrypt and Decrypt screens */}
      <button
        className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
        onClick={() => switchScreen("encrypt")}
      >
        Encrypt
      </button>
      <button
        className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
        onClick={() => switchScreen("decrypt")}
      >
        Decrypt
      </button>
    </div>

    <div className="card">
      {/* Textarea for user input */}
      <textarea
        value={text}
        onChange={({ target }) => setText(target.value)}
        name="text"
        type="text"
        placeholder={
          screen === "encrypt" ? "Enter Your Text" : "Enter Encrypted Data"
        }
      />

      {/* Display error message if there's an error */}
      {errorMessage && <div className="error">{errorMessage}</div>}

      {/* Encrypt or Decrypt button */}
      <button
        className={`btn submit-btn ${
          screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
        }`}
        onClick={handleClick}
      >
        {screen === "encrypt" ? "Encrypt" : "Decrypt"}
      </button>
    </div>

    {/* Display encrypted or decrypted data if available */}
    {encrptedData || decrptedData ? (
      <div className="content">
        <label>{screen === "encrypt" ? "ENCRYPTED" : "Decrypted"} DATA</label>
        <p>{screen === "encrypt" ? encrptedData : decrptedData}</p>
        {screen === "encrypt" && (
          <div>
            <button className="btn copy-btn" onClick={copyToClipboard}>
              Copy
            </button>
            {copyMessage && <span className="copy-message">{copyMessage}</span>}
          </div>
        )}
      </div>
    ) : null}
  </div>
  )
}

export default EncryptDecrypt