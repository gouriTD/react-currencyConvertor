import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { InputBox, CustomButton } from './components';
import useCurrencyInfo from './hooks/useCurrencyInfo';

const APP_TITLE = 'Currency Convertor App'
const APP_BACKGROUND_IMAGE = 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=800'

function App() {
  
  const [fromVal, setFromVal] = useState("usd");
  const [toVal, setToVal] = useState("inr");
  const [amount, setAmount] = useState(10);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [supportedCurType, setSupportedCurType] = useState([]);
  const [conversionData, setConversionData] = useState({});

  useEffect(()=>{
    const currencyDataUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.3.18/v1/currencies/${fromVal}.json`
    fetch(currencyDataUrl)
      .then((res)=>(res.json()))
      .then(data=>{
        console.log(data)
        setSupportedCurType(Object.keys(data[fromVal]))
        setConversionData(data)
      })
    
  },[fromVal])

  const swapHandler = ()=>{
    setFromVal(toVal);
    setToVal(fromVal);
    setConvertedAmount("")
  }

  const convertCurrency = ()=>{

    /**
     * 1) Here we will get the input from fromVal 
     * 2) Then get the table for conversion
     */
    console.log(`fromVal : ${fromVal} , toVal:${toVal}, :${JSON.stringify(conversionData)}`)
    const exchangeRate = Number(conversionData[fromVal][toVal]);
    console.log(`exchangeRate: ${exchangeRate}: ${typeof exchangeRate}`)
    const newAmount = amount * exchangeRate
    setConvertedAmount(newAmount.toString())
    console.log(convertedAmount);
  }

  useEffect(()=>{setConvertedAmount("")},[toVal])

  return (
    <>
      <div className='w-full h-[100vh] bg-yellow-600 p-9 z-0 relative flex justify-center'>
        <img className=" absolute top-0 left-0" src={APP_BACKGROUND_IMAGE} alt="" srcSet="" style={{width:'100%',height:'100%',position:'fixed',top:0,left:0,opacity:0.7}}/>
        <div className=' absolute flex flex-col gap-4 justify-center items-center'>
            <h1 className=' bg-transparent text-3xl font-bold text-white p-6 rounded-xl text-center'>{`${APP_TITLE}`}</h1>
            <div className='card bg-transparent border-4 border-white rounded-3xl p-4 flex flex-col gap-3 justify-center items-center'>
              {/* InputBox1 */}
              <InputBox 
                label={"From"} 
                currencyType={fromVal} 
                currOptionArray={supportedCurType} 
                inputAmount={amount} 
                changeAmount={(newAmount)=>{
                console.log(`amount: ${amount}`);
                setAmount(newAmount)
                }}
                selectCurrencyType={(type)=>setFromVal(type)}
              />
              <CustomButton title={"Swap"} onClickHandler={swapHandler}/>
               

              {/* InputBox2 */}
              <InputBox 
                label={"To"} 
                currencyType={toVal} 
                currOptionArray={supportedCurType}
                inputAmount={convertedAmount}
                selectCurrencyType={(type)=>{
                  setToVal(type)
                  console.log(type)
                }}
              />
              <CustomButton title={`Convert ${fromVal.toUpperCase()} to ${toVal.toUpperCase()}`} onClickHandler={convertCurrency}/>

            </div>
        </div>
        
      </div>
      
    </>
  )
}

export default App
