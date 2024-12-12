import Header from '../components/Header'
import Aktivnosti_korisnik from '../components/Aktivnosti_korisnik'

import {Dogadaji, Gradovi} from '../interface'
import { useEffect, useState } from 'react'
import axios from 'axios'


function Aktivnosti() {

  let [dogadaji, setDogadaji] = useState<Dogadaji[]>([])
  let [gradovi] = useState<Gradovi[]>([])


  useEffect(()=>{
    axios
      .get<Dogadaji[]>('http://localhost:3001/Dogadaji')
      .then((res) => {
        setDogadaji(res.data)
      })
  }, [])

  
    
    return (
  
      <>
        <Header />
        <h1>Aktivnosti</h1>
        <Aktivnosti_korisnik dogadaji={dogadaji} gradovi={gradovi} setDogadaji={setDogadaji}/>
      
      
      </>
    )
    }
  
  export default Aktivnosti;