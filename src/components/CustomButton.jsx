import React from "react";


const CustomButton = ({title, onClickHandler })=>{
    return(
        <button className='p-2 rounded-lg bg-blue-700 text-white w-full active:bg-orange-700 cursor-pointer' onClick={onClickHandler}>{title}</button>
    )
}

export default CustomButton