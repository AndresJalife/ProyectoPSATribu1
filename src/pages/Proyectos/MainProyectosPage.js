import React, { Component } from 'react';
import ProyectoCard from '../../components/Proyectos/ProyectoCard';
import './MainProyectosPage.css';
import { Button } from 'reactstrap';
import {NavLink} from "react-router-dom";


export default class MainProyectosPage extends Component
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
        const projects = (await fetch('https://proyectopsa.herokuapp.com/proyectos/')).json();
        // const project = (await fetch('https://proyectopsa.herokuapp.com/proyectos/3')).json();
        this.setState({
            projects: [projects]
        });
    }

    render()
    {
        return  (<div className='paginaProyectos'>
                    <div id='proyectosHeader'>
                        <p id='tituloProyectos'>Proyectos</p>
                        <Button className='botonAgregarProyectoContainer'>
                            <NavLink className='botonAgregarProyecto' to='/proyectos/nuevoProyecto'>Agregar Proyecto</NavLink>
                        </Button>
                    </div>
                    <div id='proyectosContainer'>
                                {this.state.projects.map((p) => <ProyectoCard project={p} />)}
                    </div>
                </div>);
        
    }
}
