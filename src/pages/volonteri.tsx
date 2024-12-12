import { useEffect, useState } from 'react'
import './volonteri.css'
import { volonteri, Vrste_aktivonsti, Gradovi } from '../interface'
import axios from 'axios'
import Header from '../components/Header'

import Show from '../components/Show'
import Add_Volonter from '../components/Add_Volonter'


function App() {
  let [types, setTypes] = useState<Vrste_aktivonsti[]>([])
  let [gradovi, setGradovi] = useState<Gradovi[]>([])
  let [volonteri, setVolonteri] = useState<volonteri[]>([])



  useEffect(()=>{
    axios
      .get<volonteri[]>('http://localhost:3001/volonteri')
      .then((res) => {
        setVolonteri(res.data)
      })
      
  }, [])

  useEffect(()=>{
    axios
      .get<Vrste_aktivonsti[]>('http://localhost:3001/Aktivnosti')
      .then((res) => {
        setTypes(res.data)
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

    <div id='volonteri_div'>

      <div id='Add_items_div'>
      <Add_Volonter volonteri={volonteri} setVolonteri={setVolonteri} types={types} gradovi={gradovi}/>
      </div>
      
      <div id='show_div'>
      <Show volonteri={volonteri} setVolonteri={setVolonteri} types={types} gradovi={gradovi}/>
      </div>
      
    </div>
    </>
  )
}

export default App
