import { useState } from 'react'
import { volonteri, Vrste_aktivonsti, Gradovi } from '../interface'
import './Add_Volonter.css'
import axios from 'axios';



function Add_Volonter({volonteri, setVolonteri, types, gradovi}: {gradovi:Gradovi[], volonteri: volonteri[], types: Vrste_aktivonsti[], setVolonteri: React.Dispatch<React.SetStateAction<volonteri[]>>}) {  
    const [newitem, setNewItem] = useState({ime: '', prezime: '', vrste_aktivnosti: '', grad: ''});
    console.log(volonteri);
    const SendData = (event:any) => {
        event.preventDefault();

        axios.post('http://localhost:3001/volonteri/', newitem)
            .then(res => {
                setVolonteri((items: volonteri[])=>[...items, res.data]);
            })
    }

    const handleImeChange = (event:any) => {
        setNewItem({...newitem, ime: event.target.value});
    };

    const handlePrezimeChange = (event:any) => {
        setNewItem({...newitem, prezime: event.target.value});
    };

    const handleGrad = (event:any) => {
        setNewItem({...newitem, grad: event.target.value});
    }

    const HandleType = (event:any) => {
        setNewItem({...newitem, vrste_aktivnosti: event.target.value});
    }

    return(
        <div id='Add_items_divv'>
           <h2>Dodaj novog volontera</h2>
            <form onSubmit={SendData} >

                <input id='ime_input' required type="text" className='inputTesxtBox' value={newitem.ime} placeholder="ime" onChange={handleImeChange}/>
               
                <input id='Prezime_input' className='inputTesxtBox' required type="text" value={newitem.prezime} placeholder='prezime' onChange={handlePrezimeChange}/>

                <div id='form_div'>
                <select required onChange={handleGrad}>
                    <option value="">Grad</option>
                    {gradovi.map((type)=>(
                        <option key={type.id} value={type.grad}>{type.grad}</option>
                    ))}
                </select>

                <select required onChange={HandleType}>
                    <option value="">Aktivnost</option>
                    {types.map((type:Vrste_aktivonsti)=>(
                        <option key={type.id} value={type.vrste_aktivnosti}>{type.vrste_aktivnosti}</option>
                    ))}
                </select>
                 

            <button className='Add_items_btn' type="submit">Dodaj</button>
            </div>
            </form>
        </div>
    )


}

export default Add_Volonter