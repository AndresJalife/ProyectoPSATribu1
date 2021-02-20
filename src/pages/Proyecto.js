import React, { Component } from 'react'
import {Proyecto} from '../'

export default class Proyecto extends Component {

    constructor(){
        super();
        this.obtenerProyectos();
    }

    agregarProyecto(){

    }

    obtenerProyectos(){
        let listaProyectos= [];

        function reqListener() {
            let data = JSON.parse(this.responseText);
            data.map(proyecto => {listaProyectos.append(
                <Proyecto dataProyecto={proyecto} />
            )});
        }
          
        function reqError(err) {
            console.log('Fetch Error :-S', err);
        }
          
        let getReq = new XMLHttpRequest();
        getReq.onload = reqListener;
        getReq.onerror = reqError;
        getReq.open('GET', 'https://proyectopsa.herokuapp.com/proyectos', true);
        getReq.send();


    }

    render() {
        return (
            <div class='proyectosContainer'>
                <p>Proyectos</p>
                <button class='botonAgregarProyecto' onClick={this.agregarProyecto()}>Agregar Proyecto</button>
                
                
            </div>
        )
    }
}
