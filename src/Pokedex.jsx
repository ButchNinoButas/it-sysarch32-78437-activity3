
import { useState, useEffect } from 'react'
import Pokemon from './Pokemon'

export default function Pokedex(){
    const [pokemons, setPokemons] = useState([])
    const [lang, setLang] = useState('english')



    useEffect(()=>{
        fetch('https://us-central1-it-sysarch32.cloudfunctions.net/pokemon').then(res=>{
            res.json().then(data=>{
                const newData = []

                data.forEach(el =>
                    newData.push({...el, pokeStats: el.base})      
                );

                setPokemons(newData)
            })
        })

    },[])



    return <main>
    <div className="change_language">
        <button onClick={()=>setLang('english')}>English</button>
        <button onClick={()=>setLang('japanese')}>Japanese</button>
        <button onClick={()=>setLang('chinese')}>Chinese</button>
        <button onClick={()=>setLang('french')}>French</button>
    </div>

    <ul className="pokedex">
        {pokemons.map(el=>{
            const pokemon = {...el, pokeName: el.name[lang]}
            return <Pokemon key={el.id} {...pokemon}/>

        }
        )}
    </ul>

    </main>
}
