"use client";
import React, { useState } from 'react';

const classError = "pl-2 !border !border-red-400 rounded bg-red-100 w-full"
const classGood = "pl-2 !border !border-green-400 rounded bg-teal-100 w-full"
const classNone = "pl-2 !border !border-grey-400 rounded w-full"

const Unknown = ({text}:{text:string})=>{
    const [classString, setClassString] = useState<string>(classNone)
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