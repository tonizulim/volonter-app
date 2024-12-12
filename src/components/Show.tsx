import { useState, useEffect } from 'react'
import { volonteri, Vrste_aktivonsti, Gradovi } from '../interface'
import axios from 'axios'
import './Show.css'
import Admin from "../components/context"
import { useContext } from 'react'

function Show({volonteri, setVolonteri, types, gradovi}: {gradovi:Gradovi[], volonteri: volonteri[], types: Vrste_aktivonsti[], setVolonteri: React.Dispatch<React.SetStateAction<volonteri[]>>}) {
    const [selectedType, setSelectedType] = useState<string>('')
    const [ShowVolonteri, setShowVolonteri] = useState<volonteri[]>(volonteri)
    const admin = useContext(Admin)

    
    useEffect(()=>{
        filterVolonteri()
    }, [volonteri])

    useEffect(()=>{
        filterVolonteri()
    }, [selectedType])

    const filterVolonteri = () => {
        if(selectedType === ''){
            setShowVolonteri(volonteri)
        }
        else{
            setShowVolonteri(volonteri.filter((volonteri) => volonteri.vrste_aktivnosti === selectedType))
        }
    }

    const handleChangeFilter = (event: any) => {
        setSelectedType(event.target.value);
    }

    const showItems = () => {
        return(
            <>
            {ShowVolonteri.map((item : volonteri )=>(
                <div className='item_list_div' key={item.id}>
                    <p className='item_list'>{item.id}</p>
                    <p className='item_list'>{item.ime}</p>
                    <p className='item_list'>{item.prezime}</p>
                    <p className='item_list'>{item.grad}</p>
                    <p className='item_list'>{item.vrste_aktivnosti}</p>

                </div>
            ))}
            </>
        )
    }

    const del = (event : any) => {
        const id = event.target.value;
        if(!window.confirm(`You sure to delete this item ${id}?`)){
            return;
        }
        axios.delete(`http://localhost:3001/volonteri/${id}`)
        .then(() => {
            setVolonteri(volonteri.filter(volonteri => volonteri.id !== id));
        });

    }

    const manageType_of = ({event, item} : {event:any; item:string}) =>{
        axios.patch(`http://localhost:3001/volonteri/${item}`, {vrste_aktivnosti: event.target.value})
        .then(res => {
            setVolonteri(volonteri.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const manageGrad = ({event, item} : {event:any; item:string}) =>{
        axios.patch(`http://localhost:3001/volonteri/${item}`, {grad: event.target.value})
        .then(res => {
            setVolonteri(volonteri.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const handleImeChange = ({event, item} : {event:any; item:string}) => {
        axios.patch(`http://localhost:3001/clothes/${item}`, {image: event.target.value})
        .then(res => {
            setVolonteri(volonteri.map(item => item.id === res.data.id ? res.data : item))
        });
    }

    const handlePrezimeChange = ({event, item} : {event:any; item:string}) => {
        axios.patch(`http://localhost:3001/clothes/${item}`, {image: event.target.value})
        .then(res => {
            setVolonteri(volonteri.map(item => item.id === res.data.id ? res.data : item))
        });
    }


    const CostumizeItems = () => {
        
        return(
            <>
            {ShowVolonteri.map((item : volonteri )=>(
                <div className='item_list_div' key={item.id}>
                    <p className='item_list'>{item.id}</p>

                    <div className='item_list_costumize'>
                        <input className='item_list_input' required type="text" value={item.ime} onChange={()=>handleImeChange({ event, item: item.id })}/>
                    </div>

                    <div className='item_list_costumize'>
                        <input className='item_list_input' required type="text" value={item.prezime} onChange={()=>handlePrezimeChange({ event, item: item.id })}/>
                    </div>

                    <div className='item_list_costumize'>
                    <select required value={item.grad} onChange={()=>manageGrad({ event, item: item.id })}>
                        {gradovi.map((type)=>(
                            <option key={type.id} value={type.grad}>{type.grad}</option>
                        ))}
                    </select>
                    </div>

                    <div className='item_list_costumize'>
                    <select required value={item.vrste_aktivnosti} onChange={()=>manageType_of({ event, item: item.id })}>
                        {types.map((type:Vrste_aktivonsti)=>(
                            <option key={type.id} value={type.vrste_aktivnosti}>{type.vrste_aktivnosti}</option>
                        ))}
                    </select>
                    </div>


                    <button value={item.id} onClick={del}>delete</button>
                    
                </div>
            ))}
            </>
        )
    }

    return (
    <div id='show_div'>
        <div id='selelct_type'>
            <h2>Filter</h2>
            <label key='1' ><input name='filter_btn' type='radio' value='' defaultChecked={true} onChange={handleChangeFilter}/>Sve</label>

            {types.map(type => (
                <label key={type.id}><input name='filter_btn' key={type.id} type='radio' value={type.vrste_aktivnosti} onChange={handleChangeFilter}/>{type.vrste_aktivnosti}</label>
            ))}
        </div>

        <div id='item_list'>
            <h2>Popis volontera</h2>
            <div className='item_list_div'>
                <p className='item_list'>id</p>
                <p className='item_list'>ime</p>
                <p className='item_list'>prezime</p>
                <p className='item_list'>grad</p>
                <p className='item_list'>aktivnost</p>
                {admin && <p className='item_list'>izbriši</p>}
            </div>

            {!admin ? showItems() : CostumizeItems() }

        </div>
      
    </div>
  )
}

export default Show