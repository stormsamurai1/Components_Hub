import React,{useState,useEffect} from 'react';
import api from '../../services/api';

function Hub(){
    const [components, setComponents] = useState([]);

    async function getListComponents(){
        const res = await api.get('/getComponents')

        return res.data;
    }

    async function getComponents(){
        function clearComponentName(List){
            List.map((componentName)=>{
                let index = list.indexOf(componentName);

                let fixedName = componentName.substring(0,componentName.length-3)

                List[index] = fixedName
            })
        }

        let list = await getListComponents();

        clearComponentName(list)
        
        //const list = ["C1","C2","C3"]
        let tempList = [];


        list.map((componentName)=>{
            import(`../ToRenderComponents/${componentName}`).then(
                (obj)=>{
                    tempList.push(obj)
                    setComponents(tempList)
                }).catch((e)=>{console.log(e)})
                
        })
        
    }

    useEffect(()=>{
        getComponents()
    },components)

    const itens = components
    return(
        <>  
            {itens ?
                itens.lenght === 0 ?
                    <h1> Nenhum componente encontrado </h1>
                : itens.map((component) =>{
                    return component.default()
                  })
            : <h1> Carregando componentes </h1>
            }
        </>
    )
}

export default Hub;

