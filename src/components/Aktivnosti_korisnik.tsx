import {Dogadaji, Gradovi} from '../interface'
import {useState} from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { useContext } from 'react'
import Admin from "./context"
import './Aktivnosti_korisnik.css'

function Aktivnosti_korisnik({dogadaji, setDogadaji, gradovi}: {gradovi:Gradovi[], dogadaji: Dogadaji[], setDogadaji: React.Dispatch<React.SetStateAction<Dogadaji[]>>}) {  
    console.log(gradovi);
    const [newitem, setNewItem] = useState({naziv: '', datum:'', lokacija:'', udruga_naziv:'', vrsta_aktivnosti:'', opis:''	})
  
    const [selectedTopic, setSelectedTopic] = useState(newitem);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const admin = useContext(Admin)

    const openModal = (topic:any) => {
        setSelectedTopic(topic);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const izbrisi_dogadaj = (event:any) => {
        const id = event.target.value;
        if(!window.confirm(`You sure to delete this item ${id}?`)){
            return;
        }
        axios.delete(`http://localhost:3001/Dogadaji/${id}`)
        .then(() => {
            setDogadaji(dogadaji.filter(dogadaji => dogadaji.id !== id));
        });
    }

    const Prikazi_dogadaje = () =>{
        return(
        <div id='dogadaji_div'>
            {dogadaji.map((topic:any) => (<div className='list_div'>
                <div key={topic.id} className='list_divv' onClick={() => openModal(topic)}>
                <h3>Naziv: {topic.naziv}</h3>
                <h4>Datum: {topic.datum}</h4>
                </div>
                {admin && <button key={topic.id} value={topic.id} onClick={izbrisi_dogadaj}>Izbrisi</button>}
            </div>
            ))}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Topic Details Modal"
            >
                {selectedTopic && (
                <div className='popup_div'>
                    <h2>Naziv: {selectedTopic.naziv}</h2>
                    <p>Datum: {selectedTopic.datum}</p>
                    <p>Lokacija: {selectedTopic.lokacija}</p>
                    <p>Naziv Udruge:{selectedTopic.udruga_naziv}</p>
                    <p>Vrsta aktivnosti: {selectedTopic.vrsta_aktivnosti}</p>
                    <p>Opis: {selectedTopic.opis}</p>
                    <button onClick={closeModal}>Zatvor</button>
                </div>
                )}
            </Modal>
        </div>
        )
    }

    const SendData = (event:any) => {
        event.preventDefault();

        axios.post('http://localhost:3001/Dogadaji/', newitem)
        .then(res => {
            setDogadaji((items: Dogadaji[])=>[...items, res.data]);
        })

    }

    const handleNazivChange = (event:any) => {
        event.preventDefault();
        setNewItem({...newitem, naziv: event.target.value});
    };
    const handleLokacija = (event:any) => {
        setNewItem({...newitem, lokacija: event.target.value});
    };
    const handleDatum = (event:any) => {
        setNewItem({...newitem, datum: event.target.value});
    };
    const handleUdruga_naziv = (event:any) => {
        setNewItem({...newitem, udruga_naziv: event.target.value});
    }
    const handleVrsta_aktivnosti = (event:any) => {
        setNewItem({...newitem, vrsta_aktivnosti : event.target.value});
    }

    const handleOpis = (event:any) => {
        setNewItem({...newitem, opis : event.target.value});
    }

    return(
        < div id='aktivnosti_div'>
        <div id='Add_items_divv'>
           <h2>Dodaj novog volontera</h2>
            <form onSubmit={SendData} >

                <input id='naziv_input' required type="text" value={newitem.naziv} className='inputTesxtBox' placeholder='naziv' onChange={handleNazivChange}/>

                <input id='datum_input' required type="text" value={newitem.datum} className='inputTesxtBox' placeholder='Datum' onChange={handleDatum}/>

                <input id='lokacija_input' required type="text" value={newitem.lokacija} className='inputTesxtBox' placeholder='lokacija' onChange={handleLokacija}/>
                
                <input id='udruga_input' required type="text" value={newitem.udruga_naziv} className='inputTesxtBox' placeholder='Udruga' onChange={handleUdruga_naziv}/>
                
                <input id='aktivnost_input' required type="text" value={newitem.vrsta_aktivnosti} className='inputTesxtBox' placeholder='Vrsta aktivnosti' onChange={handleVrsta_aktivnosti}/>

                <input id='opis_input' required type="text" value={newitem.opis} className='inputTesxtBox' placeholder='Opis aktivnosti' onChange={handleOpis}/>
 

            <button className='Add_items_btn' type="submit">Dodaj</button>
            
            </form>
        </div>
        {<Prikazi_dogadaje />}
        </div>
    )
}
export default Aktivnosti_korisnik;