import { useState } from "react"
import { Verb } from './TableForm'

interface Props{
    allVerbs: Verb[];
    onApply: (from:number,to:number, total:number)=> void;
}
const classNone = "pl-2 !border  !border-grey-300 rounded w-16"

const Controls = ({allVerbs,onApply}:Props)=>{
    const [from, setFrom] = useState<number>(1)
    const [to, setTo] = useState<number>(51)
    const [total, setTotal] = useState<number>(10)


    const handleChangeFrom = (e: React.FormEvent<HTMLInputElement>)=>{
        const value = e.currentTarget.value;
        setFrom(Number(value))
      }
    const handleChangeTo = (e: React.FormEvent<HTMLInputElement>)=>{
      const value = e.currentTarget.value;
      setTo(Number(value))
    }
    const handleChangeTotal = (e: React.FormEvent<HTMLInputElement>)=>{
      const value = e.currentTarget.value;
      setTotal(Number(value))
    }

    return <>
    <div className="m-5 text-center">
      Show <input type="number" onChange={handleChangeTotal} min='1' max={to-from} value={total} className={classNone} /> random verbs, from <input type="number" onChange={handleChangeFrom} min='1' value={from} className={classNone} /> 
    <span className="text-slate-400 italic p-1">({allVerbs[from-1]?.infinitive})</span> to <input type="number" onChange={handleChangeTo} min='2' max={allVerbs.length} value={to} className={classNone}/>
    <span className="text-slate-400 italic p-1">({allVerbs[to-1]?.infinitive})</span>
    </div>
    <div className="text-center">
      <button 
        className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" 
        onClick={()=>onApply(from,to,total)}>
        Apply
      </button></div>
    </>
}

export default Controls