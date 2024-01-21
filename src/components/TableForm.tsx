"use client";
import { useState, useEffect } from 'react';
import Unknown from './Unknown';
const TABLE_HEAD = ['infinitive', 'past', 'participle', 'español'];


interface Verb{
    infinitive:string;
    past:string;
    participle:string;
    translation:string;
}

interface VerbsObj {
  verbs: Verb[]
}

const Row = ({infinitive, past, participle, translation}:Verb)=>{
    const knownIndex = Math.floor(Math.random()*4)
    const classes =  "p-4 border-b border-blue-gray-50";
    return <tr key={infinitive}>
        <td className={classes}>{knownIndex === 0 ? infinitive : <Unknown text={infinitive}/>}</td>
        <td className={classes}>{knownIndex === 1 ? past : <Unknown text={past}/>}</td>
        <td className={classes}>{knownIndex === 2 ? participle: <Unknown text={participle}/>}</td>
        <td className={classes}>{knownIndex === 3 ? translation: <Unknown text={translation}/>}</td>
    </tr>
}

const TableForm = ()=>{
  const [verbs, setVerbs] = useState<Verb[]>([])

  useEffect(() => {
    (async () => {
      const verbsObj = await import('./verbs.json') as unknown as VerbsObj;
      setVerbs(verbsObj.verbs);
    })();
  }, []);

  if (!verbs) return <div>Loading...</div>;

  const rows = verbs.map((verb:Verb,index:number)=>{
    const { infinitive, past, participle, translation} = verb
    return <Row key={index} infinitive={infinitive} past={past} participle={participle} translation={translation} />
  })
    return <>
    <table className="w-full min-w-max table-auto text-left">
    <thead>
      <tr>
        {TABLE_HEAD.map((head) => (
          <th
            key={head}
            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
          >
              {head.toUpperCase()}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
    </>

}

export default TableForm