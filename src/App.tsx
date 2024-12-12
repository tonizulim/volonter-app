import {useState} from 'react'
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import Pocetna from './pages/pocetna'
import Udrugee from './pages/udrugee'
import Aktivnosti from './pages/aktivnosti'
import Volonteri from './pages/volonteri'
import No_page from './pages/no_page'

import Admin from "./components/context"


import './App.css'


function App() {

  const [admin, postaviAdmin] = useState(false)
 
  function promjenaAdmin(){
    postaviAdmin(!admin)
  }

  return (
    <>


      <BrowserRouter>
      <Admin.Provider value={admin}>
        <div id="outter_div">
      <label className="sliding-checkbox">
        <input
          type="checkbox"
          onChange={promjenaAdmin}
        />
        <span className="slider"></span>
        <p>admin</p>
        </label>

        <Routes>
          <Route path="/zavrsni_" element={<Pocetna />} />
          <Route path="/zavrsni_/udruge" element={<Udrugee />} />
          <Route path="/zavrsni_/aktivnosti" element={<Aktivnosti  />} />
          <Route path="/zavrsni_/volonteri" element={<Volonteri />} />
          <Route path="*" element={<No_page />} />
        </Routes>
        </div>
        </Admin.Provider>

      </BrowserRouter>
      
      

      
      
    </>
  )
}

export default App
