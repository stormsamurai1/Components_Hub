import React,{useState} from 'react';
import {Component} from 'react';
import api from '../../services/api';

class Hub extends Component{
    state = {
        componentsList: null,
    }

    getListComponents = async () =>{
        const res = await api.get('/getComponents');
        return res.data;
    }

    getComponents = async () =>{
        const list = await this.getListComponents();
        console.log(list)
        let testeList = []

        let list2 = ["C1", "C2"];

        await list2.forEach(compString => {
            import(`../ToRenderComponents/${compString}`).then((obj) => {
                testeList.push(obj);
                console.log(obj);
                this.setState({componentsList: testeList})
            }).catch((e) =>{
                console.log(e)
            })  
        });

        //const teste = await import(`../ToRenderComponents/${list}`)
    }

    componentDidMount(){
        this.getComponents();
    }

    render(){
        const itens = this.state.componentsList
        return(
            <>
                {itens ?
                    itens.length === 0 ? 
                        <h1>Nenhum componente no momento</h1>
                        : itens.map((component) => {
                            return component.default()
                        })
                : <h1>Carregando...</h1>
                }
            </>
        )
    }
}