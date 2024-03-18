import React, { useState } from "react";
import { useEffect } from "react";


const useCurrencyInfo = (currencyType)=>{
    console.log(currencyType)
    const currencyDataUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyType}.json`

    const [currencyData, setCurrencyData] = useState({})
    useEffect(()=>{
        fetch(currencyDataUrl)
            .then((res)=>(res.json()))
            .then(data=>setCurrencyData(data)) 
    },[currencyType])
    
    console.log("currencyData" + JSON.stringify(currencyData))
    return currencyData;
}

export default useCurrencyInfo;