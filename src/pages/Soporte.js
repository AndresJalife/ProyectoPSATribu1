import React, { Component } from 'react'
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import {NavLink} from "react-router-dom";
import ProyectoCard from "../components/Proyectos/ProyectoCard";
import ModalTickets from '../components/CargaDeTickets/ModalTickets';


export default class Soporte extends Component {

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
                        <p id='tituloTickets'>Tickets</p>
                    </div>
                    <div>
                        <Row>
                            <Col>
                                <ButtonToolbar>
                                    <ModalTickets></ModalTickets>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        </div>
                    <div id='proyectosContainer'>
                                {this.state.projects.map((p) => <ProyectoCard project={p} />)}
                    </div>
                </div>);

    }


}