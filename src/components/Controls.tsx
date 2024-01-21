import { useState } from "react"
import { Verb } from './TableForm'

interface Props{
    allVerbs: Verb[];
    onApply: (from:number,to:number)=> void;
}
const classNone = "pl-2 !border  !border-grey-300 rounded w-20"

const Controls = ({allVerbs,onApply}:Props)=>{
    const [from, setFrom] = useState<number>(1)
    const [to, setTo] = useState<number>(10)

    const handleChangeFrom = (e: React.FormEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value;
        setFrom(Number(value))
      }
      const handleChangeTo = (e: React.FormEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value;
        setTo(Number(value))
      }
    return <>
    <div>from <input type="number" onChange={handleChangeFrom} min='1' value={from} className={classNone} /> 
    <span className="text-slate-400 italic pl-2">{allVerbs[from]?.infinitive}</span></div>
    <div>to <input type="number" onChange={handleChangeTo} min='2' max={allVerbs.length-1} value={to} className={classNone}/>
    <span className="text-slate-400 italic pl-2">{allVerbs[to]?.infinitive}</span></div>
    <div>
      <button 
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
        onClick={()=>onApply(from,to)}>
        apply
      </button></div>
    </>
}

export default Controls