import React, { Component } from 'react';
import ProyectoCard from '../../components/Proyectos/ProyectoCard';
import './MainProyectosPage.css';
import { Button } from 'reactstrap';


export default class MainProyectosPage extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    agregarProyecto() {
        
    }

    async componentDidMount() {
        const projects = (await fetch('https://proyectopsa.herokuapp.com/proyectos/')).json();
        // const project = (await fetch('https://proyectopsa.herokuapp.com/proyectos/3')).json();
        this.setState({
            projects: [projects]
        });
    }

    render(){
        return  (<div className='paginaProyectos'>
                    <div id='proyectosHeader'>
                        <p id='tituloProyectos'>Proyectos</p>
                        <a className='botonAgregarProyectoContainer' href='/proyectos/nuevoProyecto'>
                            <Button>Agregar Proyecto</Button>
                        </a>

                    </div>
                    {this.state.projects.map((p) => <ProyectoCard project={p} />)}
                </div>);
        
    }
}
