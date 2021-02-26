import React, { Component } from 'react';
import {Button, Table, Row, Col, Card, CardBody, Container, CardHeader, Breadcrumb, BreadcrumbItem, Badge   } from 'reactstrap';
import './MainProyectosPage.css';
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";


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
       return  <div>
            <Row>
                    <Col xl={12} lg={12}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Proyectos</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row>
                    <Col xl={{size: 6, offset: 3}}>
                        <Card>
                            <CardHeader tag="h2">Proyectos</CardHeader>

                            <CardBody>
                                <Container>

                                    {this.state.isLoading ?
                                        <Row>
                                            <Col className="text-center">
                                                <Loader
                                                    type="TailSpin"
                                                    color="#00BFFF"
                                                    height={50}
                                                    width={50}></Loader>
                                            </Col>
                                        </Row>
                                        :
                                        <Row>
                                            <Col>
                                                <Table striped>
                                                    <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Estado</th>
                                                        <th><Link to={"/nuevoProyecto"} className="botonAgregarProyectoContainer">Agregar Proyecto</Link></th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    
                                                    {this.state.projects.map((r) =>{
                                                        const estadoString = r.estado.charAt(0).toUpperCase() + r.estado.slice(1);
                                                        return <tr key={r.legajo}>
                                                            <td>{r.nombre}</td>
                                                            <td><Badge color={"success"}>{estadoString}</Badge></td>
                                                            <td>
                                                                <Link to={`/proyectos/${r.codigo}/tareas`}>
                                                                    <Button color="info">Ver Tareas</Button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    }
                                                    )}
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    }


                                </Container>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
        </div>
        
    }
}
