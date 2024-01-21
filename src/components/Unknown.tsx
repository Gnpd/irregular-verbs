"use client";
import React, { useState } from 'react';

const classError = "pl-2 !border  !border-red-300 rounded bg-red-100"
const classGood = "pl-2 !border  !border-green-300 rounded bg-teal-100"
const classNone = "pl-2 !border  !border-grey-300 rounded"

const Unknown = ({text}:{text:string})=>{
    const [classString, setClassString] = useState<string>("!border  !border-grey-300 rounded")
    const splited = text.split(', ')
    const handleChange = (e: React.FormEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value;
        if(value === ''){
            setClassString(classNone)
        } else if (value === text || splited.includes(value)){
            setClassString(classGood)
        } else {
            setClassString(classError)
        } 
    }
  
    return<>
    <input
    onChange={handleChange}
    className={classString}
    placeholder=" " />
    </>}

export default Unknown