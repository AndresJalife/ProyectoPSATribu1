import React, { Component } from 'react';
import ProyectoCard from '../../components/Proyectos/ProyectoCard';
import './MainTareasPage.css';
import { Button } from 'reactstrap';


export default class MainTareasPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            tareas: []
        }
    }

    componentDidMount()
    {
        fetch('https://proyectopsa.herokuapp.com/proyectos/')
            .then(r => r.json())
            .then((tareas) =>
            {
                this.setState({
                    tareas: tareas
                });
            }, (error) => {console.log(error);});
    }

    render()
    {
        return  (<div className='paginaProyectos'>
                    <div id='proyectosHeader'>
                        <h1>Proyectos</h1>
                        <a className='botonAgregarProyectoContainer' href='/proyectos/nuevoProyecto'>
                            <Button>Agregar Tarea</Button>
                        </a>
                    </div>
                    <br />
                    <br />
                    {this.state.projects.map((p) => <ProyectoCard key={p.codigo} project={p} />)}
                </div>);
        
    }
}
