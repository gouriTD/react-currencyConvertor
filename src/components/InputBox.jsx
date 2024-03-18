import React,{useId} from "react";

const InputBox = ({label,currencyType='usd',currOptionArray,inputAmount=0,changeAmount,selectCurrencyType }) => {
    const amountId = useId();
    return (
        <div className='InputBox flex justify-between gap-4 bg-slate-200 p-4 rounded-xl'>
            {/* From input */}
            <div className='flex flex-col'>
                <label className="mb-2" htmlFor={amountId} >{label}: {currencyType.toUpperCase()}</label>
                <input className="rounded-md px-2 py-1" type="number" id={amountId} value={inputAmount} onChange={(e)=>changeAmount(e.target.value
                    )}/>
            </div>

            {/* currency type */}
            {/* Instead of setting selected in option we should set the selected value in select tag. */}
            <div className='flex flex-col'>
                <label className="mb-2" htmlFor="curType">Currency Type:</label>
                <select className="rounded-md px-2 py-1" id="curType" value={currencyType} onChange={(e)=>selectCurrencyType(e.target.selectedOptions[0].innerText.toLowerCase())}>
                    {currOptionArray.map((curr, i) => (
                    <option 
                    key={curr+i} 
                    value={curr} 
                    // selected={curr === currencyType?true:false} 
                    >{curr.toUpperCase()}</option>))}
                </select>
            </div>

        </div>
    )
}

export default InputBox