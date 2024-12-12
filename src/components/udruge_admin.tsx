import { useEffect, useState } from 'react'
import { Udruge, Gradovi } from '../interface'
import './Add_Volonter.css'
import axios from 'axios';


function Udruga_admin({udruge, setUdruge, gradovi}: {gradovi:Gradovi[], udruge: Udruge[], setUdruge: React.Dispatch<React.SetStateAction<Udruge[]>>}) {  
    let [newitem, setNewItem] = useState<Udruge>()
    console.log(newitem);
    console.log(gradovi);
    let [Udruge_neodobrene, setUdruge_neodobrene] = useState<Udruge[]>([])

    useEffect(()=>{
        axios
          .get<Udruge[]>('http://localhost:3001/Udruge_neodobrene')
          .then((res) => {
            setUdruge_neodobrene(res.data)
          })
          
      }, [])

    const del = (event : any) => {
        const id = event.target.value;
        if(!window.confirm(`jeste li sigurni da zeljite izbrisati ${id}?`)){
            return;
        }
        axios.delete(`http://localhost:3001/Udruge/${id}`)
        .then(() => {
            setUdruge(udruge.filter(udruge => udruge.id !== id));
        });
    }

    const del_neodobrene = (event : any) => {
        const id = event.target.value;
        if(!window.confirm(`jeste li sigurni da zeljite izbrisati ${id}?`)){
            return;
        }
        axios.delete(`http://localhost:3001/Udruge_neodobrene/${id}`)
        .then(() => {
            setUdruge_neodobrene(Udruge_neodobrene.filter(udruge => udruge.id !== id));
        });
    }
    
    const odobri = (event : any) => {
        event.preventDefault();
        const id = event.target.value;

        axios
          .get<Udruge>(`http://localhost:3001/Udruge_neodobrene/${id}`)
          .then((res) => {
            setNewItem(res.data)
            const post = res.data;

            axios.post('http://localhost:3001/Udruge', post)
            .then(res => {
                setUdruge((items: Udruge[])=>[...items, res.data]);
            })

            axios.delete(`http://localhost:3001/Udruge_neodobrene/${id}`)
            .then(() => {
                setUdruge_neodobrene(Udruge_neodobrene.filter(udruge => udruge.id !== id));
            });
          })


        
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
                    <button value={item.id} onClick={del}>obriši</button>

                </div>
            ))}
            </>
        )
    }

    const Prikazi_Udruge_neodobrene = () => {
        return(
            <>
            {Udruge_neodobrene.map((item : Udruge )=>(
                <div className='item_list_div' key={item.id}>
                    <p className='item_list'>{item.id}</p>
                    <p className='item_list'>{item.naziv}</p>
                    <p className='item_list'>{item.adresa}</p>
                    <p className='item_list'>{item.grad}</p>
                    <button value={item.id} onClick={del_neodobrene}>obriši</button>
                    <button value={item.id} onClick={odobri}>odobri</button>

                </div>
            ))}
            </>
        )
    }

    return(
        <>

        <div id='item_list'>
        <h3>Popis učlanjenih udruga</h3>

        <div className='item_list_div'>
            <p className='item_list'>id</p>
            <p className='item_list'>naziv</p>
            <p className='item_list'>adresa</p>
            <p className='item_list'>grad</p>
            <p className='item_list'>obriši</p>
        </div>

    </div>

    {Prikazi_Udruge()}
    <hr />
    <h3>Udruge koje čekaju odobrenje</h3>
    {Prikazi_Udruge_neodobrene()}
    </>
    )


}

export default Udruga_admin