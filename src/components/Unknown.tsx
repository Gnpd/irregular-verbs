"use client";
import React, { useState } from 'react';

const classError = "pl-2 !border !border-red-400 rounded bg-red-100 w-full"
const classGood = "pl-2 !border !border-green-400 rounded bg-teal-100 w-full"
const classNone = "pl-2 !border !border-grey-400 rounded w-full"

const ERROR_CLASS = "pl-2 !border !border-red-400 rounded bg-red-100 w-full";
const GOOD_CLASS = "pl-2 !border !border-green-400 rounded bg-teal-100 w-full";
const NONE_CLASS = "pl-2 !border !border-grey-400 rounded w-full";

const Unknown = ({text,onChange}:{text:string,onChange:(score:number)=>void})=>{
    const [classString, setClassString] = useState<string>(classNone)
    const splitedComa = text.split(/, ?/);

    const getClassString = (value: string) => {
        const splitedValueComa = value.split(/, ?/);
        const splitedValueSlash = value.split(/ ?\/ ?/);
        if (value === '') {
            return NONE_CLASS;
        } else if (
            value === text ||
            splitedComa.includes(value) ||
            splitedValueComa.every((elem:string) => splitedComa.indexOf(elem) > -1) ||
            splitedValueSlash.every((elem:string) => splitedComa.indexOf(elem) > -1)
        ) {
            onChange(1)
            return GOOD_CLASS;
        } else {
            onChange(0)
            return ERROR_CLASS;
        }
    };
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value.toLowerCase();
        setClassString(getClassString(value));
    }
  
    return<>
    <input
    onChange={handleChange}
    className={classString}
    placeholder=" " />
    </>}

export default Unknown