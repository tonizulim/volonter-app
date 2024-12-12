import {  useState } from 'react'
import { Udruge, Gradovi } from '../interface'
import './udruge_korisnik.css'
import axios from 'axios';


function Udruga_korisnik({udruge, setUdruge, gradovi}: {gradovi:Gradovi[], udruge: Udruge[], setUdruge: React.Dispatch<React.SetStateAction<Udruge[]>>}) {
    const [newitem, setNewItem] = useState({naziv: '', adresa: '', grad: ''});
    const [sortiraj_po, setSortiraj] = useState("naziv")
    const [jel_poslan, setJel_poslan] = useState(false);

    // const Sortiraj = () => {
    // const sortiraneUdruge = [...udruge].sort((a, b) => {
    //    return a.naziv.localeCompare(b.naziv);
    // });

    // setUdruge(sortiraneUdruge);
    // }

    //Sortiraj();

    const SendData = (event:any) => {
        event.preventDefault();

        axios.post('http://localhost:3001/Udruge_neodobrene/', newitem)

        setJel_poslan(!jel_poslan);
    }

    const handleAdresaChange = (event:any) => {
        setNewItem({...newitem, adresa: event.target.value});
    };

    const handleNazivChange = (event:any) => {
        setNewItem({...newitem, naziv: event.target.value});
    };

    const handleGrad = (event:any) => {
        setNewItem({...newitem, grad: event.target.value});
    }

    const handle_Sortiraj_Po = (event:any) => {
        setSortiraj(event.target.value);

        const sortiraneUdruge = [...udruge].sort((a, b) => {
            return a.naziv.localeCompare(b.naziv);
          });

          setUdruge(sortiraneUdruge);
      };

    const Dodaj_udrugu = () => {
        return(
        <div id='Add_udruga_div'>
           <h2>Dodaj novu udrugu</h2>
            <form onSubmit={SendData} >

                <input id='v' required type="text" className='inputTesxtBox' value={newitem.naziv} placeholder='Naziv' onChange={handleNazivChange}/>

                <input id='adresa_input' required type="text" className='inputTesxtBox' value={newitem.adresa} placeholder='Adresa' onChange={handleAdresaChange}/>

                <div id='form_div'>
                <select required onChange={handleGrad}>
                    <option value="">Grad</option>
                    {gradovi.map((type)=>(
                        <option key={type.id} value={type.grad}>{type.grad}</option>
                    ))}
                </select>

            <button className='Add_items_btn' type="submit">Dodaj</button>
            </div>
            </form>
        </div>
        )
    }

    const Poslan_zahtjev = () => {
        return(
        <h3>Vaš zahtjev je poslan ceka se odobrenje administratora</h3>
        )
    }


    const Prikazi_Udruge = () => {
        return(
            <>
            {udruge.map((item : Udruge )=>(
                <div className='item_list_div' key={item.id}>
                    <p className='item_list'>{item.id}</p>
                    <p className='item_list'>{item.naziv}</p>
                    <p className='item_list'>{item.adresa}</p>
                    <p className='item_list'>{item.grad}</p>
                </div>
            ))}
            </>
        )
    }

    return(
        <div id='udruge_korisnik_div'>
        <div id='nova_udruga'>
        {!jel_poslan ? Dodaj_udrugu() : Poslan_zahtjev()}
        </div>

        <div id='item_list'>
        <h2>Popis udruga</h2>
        <p>Sortiraj udruge po:</p>

        <label>
            <input type='radio' name='SortirajPo' checked={sortiraj_po=='naziv'} value="naziv" onChange={handle_Sortiraj_Po}></input>
        Naziv</label>

        <label >
            <input type='radio' name='SortirajPo' checked={sortiraj_po=='adresa'} value="adresa" onChange={handle_Sortiraj_Po}></input>
        Adresa</label>

        <label >
            <input type='radio' name='SortirajPo' checked={sortiraj_po=='grad'} value="grad" onChange={handle_Sortiraj_Po}></input>
        Grad</label>



        <div className='item_list_div'>
            <p className='item_list'>id</p>
            <p className='item_list'>naziv</p>
            <p className='item_list'>adresa</p>
            <p className='item_list'>grad</p>
        </div>
        {Prikazi_Udruge()}
    </div>

    
    </div>
    )


}

export default Udruga_korisnik