import React, { Component } from 'react';
import './MainTareasPage.css';
import { NavLink } from 'react-router-dom';
import TareaCard from "../../components/Proyectos/TareaCard";


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
        const id = this.props.match.params.id;
        fetch(`https://proyectopsa.herokuapp.com/proyectos/${id}/tarea`)
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
        const id = this.props.match.params.id;
        return  (<div className='paginaProyectos'>
                    <h1 id='tituloProyectos'>Tareas</h1>
                    <br/>
                    <div id='titlesContainer'>
                        <p>Nombre Tarea</p>
                        <p id="estadoTitle">Estado</p>
                        <NavLink to={`/proyectos/${id}/nuevaTarea`} className="botonAgregarProyectoContainer">Agregar Tarea</NavLink>
                    </div>
                    <br />
                    {this.state.tareas.map((t) => <TareaCard key={t.codigo} codigoProyecto={id} tarea={t} />)}
                </div>);
        
    }
}
