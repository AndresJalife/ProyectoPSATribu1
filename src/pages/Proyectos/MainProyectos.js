import React, { Component } from 'react';
import ProyectoCard from '../../components/Proyectos/ProyectoCard';

export default class MainProyectos extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            projects: []
        }
    }

    agregarProyecto()
    {
        
    }

    async componentDidMount()
    {
        //const projects = (await fetch('https://proyectopsa.herokuapp.com/proyectos/')).json();
        const project = (await fetch('https://proyectopsa.herokuapp.com/proyectos/3')).json();
        this.setState({
            projects: [project]
        });
    }

    render()
    {
        return  (<div className='paginaProyectos'>
                    <div id='proyectosHeader'>
                      <p id='tituloProyectos'>Proyectos</p>
                      <button className='botonAgregarProyecto' onClick={() => this.agregarProyecto()}>Agregar Proyecto</button>
                    </div>
                    <div id='proyectosContainer'>
                        {this.state.projects.map((p) => <ProyectoCard project={p} />)}
                    </div>
                </div>);
        
    }
}
