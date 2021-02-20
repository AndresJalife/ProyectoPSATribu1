import React, { Component } from 'react';
import ProyectoCard from '../../components/Proyectos/ProyectoCard';

export default class MainProyectos extends Component {

    constructor(){
        super();
        this.obtenerProyectos();
    }

    agregarProyecto(){
        
    }

    obtenerProyectos(){
        let listaDeProyectos = <div class='listaDeProyectos'></div>;

        function reqListener() {
            let data = JSON.parse(this.responseText);
            data.map(proyecto => {listaDeProyectos.appendChild(
                <ProyectoCard dataProyecto={proyecto} />
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

        return listaDeProyectos
    }

    render() {
        return  <div class='paginaProyectos'>
                    <div id='proyectosHeader'>
                      <p id='tituloProyectos'>Proyectos</p>
                      <button class='botonAgregarProyecto' onClick={() => this.agregarProyecto()}>Agregar Proyecto</button>
                    </div>
                    
                    <div id='proyectosContainer'>
                        {this.obtenerProyectos()}   
                    </div>
                </div>
        
    }
}
