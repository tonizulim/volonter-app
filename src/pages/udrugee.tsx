import Udruga_admin from '../components/udruge_admin';
import Udruga_korisnik from '../components/udruge_korisnik';
import Header from '../components/Header'

import { Udruge, Gradovi } from '../interface'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Admin from "../components/context"
import { useContext } from 'react'


function Udrugee() {
  const admin = useContext(Admin)

  


  let [gradovi, setGradovi] = useState<Gradovi[]>([])
  let [udruge, setUdruge] = useState<Udruge[]>([])

  useEffect(()=>{
    axios
      .get<Udruge[]>('http://localhost:3001/Udruge')
      .then((res) => {
        setUdruge(res.data)
      })
      
  }, [])

  useEffect(()=>{
    axios
      .get<Gradovi[]>('http://localhost:3001/Gradovi')
      .then((res) => {
        setGradovi(res.data)
      })
  }, [])

    
    return (
  
      <>
        <Header />
        <h1>Udruge</h1>
        <hr />
        {admin ? <Udruga_admin udruge={udruge} setUdruge={setUdruge} gradovi={gradovi}/> : <Udruga_korisnik udruge={udruge} setUdruge={setUdruge} gradovi={gradovi}/>}
      
      </>
    )
  }
export default Udrugee;