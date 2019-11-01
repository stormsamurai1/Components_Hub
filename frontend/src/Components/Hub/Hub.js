import React,{useState} from 'react';
import api from '../../services/api';

function Hub(){
    const [components, setComponents] = useState([]);

    async function getListComponents(){
        const res = await api.get('/getComponents');
        return res.data;
    }

    async function getComponents(){
        const list = await getListComponents();
        const teste = await import(`../ToRenderComponents/${list[0]}`)
        
        const backup = [...components];
        backup.push(teste);
        
        console.log(backup.length)
        setComponents(backup);
        //Não está dando tempo de atualizar o array
        console.log(components.length)
        return components
    }
    
    async function renderiza(){
        const obj = await getComponents();
        
    }

    return(
        <>
            <button onClick={() => renderiza()}> Teste </button>
            <p>
                {

                }
            </p>
        </>    
    )
}

export default Hub