import React, { Component } from 'react';
import ProyectoCard from '../../components/Proyectos/ProyectoCard';
import './MainProyectosPage.css';
import { Button } from 'reactstrap';


export default class MainProyectosPage extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            projects: []
        }
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
        console.log(process.env.PUBLIC_URL)
        return  (<div className='paginaProyectos'>
                    <h1 id='tituloProyectos'>Proyectos</h1>
                    <br/>
                    <div id='titlesContainer'>
                        <p>Nombre Proyecto</p>
                        <p id="estadoTitle">Estado</p>
                        <a className='botonAgregarProyectoContainer' href='/proyectos/nuevoProyecto'>
                            <Button>Agregar Proyecto</Button>
                        </a>
                    </div>
                    <br />
                    {this.state.projects.map((p) => <ProyectoCard key={p.codigo} project={p} />)}
                </div>);
        
    }
}
