"use client";
import { useState, useEffect } from 'react';
import Controls from './Controls';
import Unknown from './Unknown';
const TABLE_HEAD = ['infinitive', 'past', 'participle', 'español'];


export interface Verb{
    infinitive:string;
    past:string;
    participle:string;
    translation:string;
}

interface VerbsObj {
  verbs: Verb[]
}

const TableHead = TABLE_HEAD.map((head) => (
  <th
    key={head}
    className="p-3 text-left"
  >
      {head.toUpperCase()}
  </th>
))

function shuffleVerbs(array:Verb[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const Row = ({infinitive, past, participle, translation}:Verb)=>{
    const knownIndex = Math.floor(Math.random()*4)
    const classes = "border-grey-light border hover:bg-gray-100 p-3";
    return <tr key={infinitive} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
        <td className={classes}>{knownIndex === 0 ? infinitive : <Unknown text={infinitive}/>}</td>
        <td className={classes}>{knownIndex === 1 ? past : <Unknown text={past}/>}</td>
        <td className={classes}>{knownIndex === 2 ? participle: <Unknown text={participle}/>}</td>
        <td className={classes}>{knownIndex === 3 ? translation: <Unknown text={translation}/>}</td>
    </tr>
}

const TableForm = ()=>{
  const [allVerbs, setAllVerbs] = useState<Verb[]>([])
  const [verbs, setVerbs] = useState<Verb[]>([])

  useEffect(() => {
    (async () => {
      const verbsObj = await import('./verbs.json') as unknown as VerbsObj;
      setVerbs(verbsObj.verbs);
      setAllVerbs(verbsObj.verbs);
    })();
  }, []);

  if (!verbs) return <div>Loading...</div>;

  const transformVerbs = (from:number,to:number)=>{
    const slice = [...allVerbs].splice(from-1, to-1)
    const random = shuffleVerbs(slice)
    setVerbs(random)
  }
    return <>
    <Controls onApply={transformVerbs} allVerbs={allVerbs} />
    <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
    <thead className="text-white">
      {verbs.map((verb)=>{
        return <tr key={verb.infinitive} className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            {TableHead}
          </tr>
      })}
    </thead>
    <tbody className="flex-1 sm:flex-none">
      {verbs.map((verb:Verb,index:number)=>{
    const { infinitive, past, participle, translation} = verb
    return <Row key={index} infinitive={infinitive} past={past} participle={participle} translation={translation} />
  })}
    </tbody>
  </table>
    </>

}

export default TableForm