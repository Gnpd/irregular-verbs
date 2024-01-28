"use client";
import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti'
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
  const [scores,setScores]= useState([0,0,0,0])
  const [knownIndex, setKnownIndex]= useState(0)
  const [isExploding, setIsExploding] = useState(false);
  const ref = useRef<HTMLTableRowElement>(null)

  useEffect(() => {
    setKnownIndex(Math.floor(Math.random()*4))
  }, []);

  useEffect(() => {
    const sum = scores.reduce((partialSum, a) => partialSum + a, 0) === 3
    if(sum){
      setIsExploding(true)
    }
  }, [scores]);

  useEffect(() => {
    setIsExploding(false)
    setScores([0,0,0])
  }, [infinitive]);

  const handleChange = (index:number,score:number)=>{
    const newScores = [...scores]
    newScores[index]=score
    setScores(newScores)
  }

  const poss = ref.current?.getBoundingClientRect()

  const classes = "h-[3.084rem] border-grey-light border hover:bg-gray-100 p-3";
  return <tr key={infinitive} ref={ref} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
      <td className={classes}>
      {isExploding && <Confetti
      confettiSource={{ x:poss?.x as number, y:poss?.y as number, w:poss?.width as number, h:poss?.height as number }}
      recycle={false}
    />}
      {knownIndex === 0 ? infinitive : <Unknown text={infinitive} onChange={(score)=>handleChange(0,score)}/>}
      </td>
      <td className={classes}>{knownIndex === 1 ? past : <Unknown text={past} onChange={(score)=>handleChange(1,score)}/>}</td>
      <td className={classes}>{knownIndex === 2 ? participle: <Unknown text={participle} onChange={(score)=>handleChange(2,score)}/>}</td>
      <td className={classes}>{knownIndex === 3 ? translation: <Unknown text={translation} onChange={(score)=>handleChange(3,score)}/>}</td>
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

  const transformVerbs = (from:number,to:number, total:number)=>{
    const slice = allVerbs.slice(from-1, to)
    //console.log(slice.map(({infinitive}:{infinitive:string})=>infinitive))
    const random = shuffleVerbs(slice)
    const toTotal = random.slice(0,total)
    setVerbs(toTotal)
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