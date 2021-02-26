import React, { Component } from 'react';
import './MainTareasPage.css';
import {Button, Table, Row, Col, Card, CardBody, Container, CardHeader, Breadcrumb, BreadcrumbItem, Badge   } from 'reactstrap';
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";

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

    getBadgeColor(estado){
        switch (estado){
            case "Iniciado":
                return "danger"
            case "Finalizado":
                return "success"
            case "En proceso":
                return "warning"
        }
    }

    render()
    {
        const id = this.props.match.params.id;
        return  <div>
                    <Row>
                            <Col xl={12} lg={12}>
                                <Breadcrumb>
                                    <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                                    <BreadcrumbItem><Link to={`/proyectos/`}>Proyectos</Link></BreadcrumbItem>
                                    <BreadcrumbItem active>Tareas</BreadcrumbItem>
                                </Breadcrumb>
                            </Col>
                        </Row>

                        <Row>
                            <Col xl={{size: 6, offset: 3}}>
                                <Card>
                                    <CardHeader tag="h2">Tareas</CardHeader>

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
                                                                <th><Link to={`/proyectos/${id}/nuevaTarea`} className="botonAgregarProyectoContainer">Agregar Tarea</Link></th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            
                                                            {this.state.tareas.map((r) =>{
                                                                let estadoString = r.estado.charAt(0).toUpperCase() + r.estado.slice(1);
                                                                let badgeColor = this.getBadgeColor(estadoString);
                                                                return <tr key={r.legajo}>
                                                                    <td>{r.nombre}</td>
                                                                    <td><Badge color={badgeColor}>{estadoString}</Badge></td>
                                                                    <td>
                                                                    <Link to={`/proyectos/${id}/tareas/${r.codigo}`}>
                                                                        <Button color="info">Ver Tarea</Button>
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
