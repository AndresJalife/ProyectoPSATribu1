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

    componentDidMount()
    {
        fetch('https://proyectopsa.herokuapp.com/proyectos/')
            .then(r => r.json())
            .then((projects) =>
            {
                this.setState({
                    projects: projects
                });
            }, (error) => {console.log(error);});
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
                        {this.state.projects.map((p) => <ProyectoCard key={p.codigo} project={p} />)}
                    </div>
                </div>);
        
    }
}
