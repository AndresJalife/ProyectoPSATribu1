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
            tareas: [],
            nombreProyecto: ""
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
            }, (error) => {console.log(error)}
        );

        fetch(`https://proyectopsa.herokuapp.com/proyectos/${id}`)
            .then(r => r.json())
            .then((proyecto) =>
            {   
                console.log(proyecto)
                this.setState({
                    nombreProyecto: proyecto.proyecto.nombre
                });
            }, (error) => {console.log(error);}
        );
    }

    render()
    {
        const id = this.props.match.params.id;
        return  (<div className='paginaProyectos'>
                    <div id="subheader"> 
                        <h1 id="proyectoName"><b>Proyecto:</b> {this.state.nombreProyecto}</h1>
                        <h2 id='tituloProyectos2'>Tareas del proyecto:</h2>
                        <br/>
                        
                    </div>
                    
                    <br/>
                    <div id='titlesContainer2'>
                        <p>Nombre Tarea</p>
                        <p id="estadoTitle2">Estado</p>
                        <NavLink to={`/proyectos/${id}/nuevaTarea`} className="botonAgregarProyectoContainer">Agregar Tarea</NavLink>
                    </div>
                    <br />
                    {this.state.tareas.map((t) => <TareaCard key={t.codigo} codigoProyecto={id} tarea={t} />)}
                </div>);
        
    }
}
