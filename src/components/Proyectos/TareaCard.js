import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {
    Card, CardText, CardBody,
    CardTitle, Button, Col, Row, Container, Badge
} from 'reactstrap';

export default function TareaCard (props)
{
    const estadoString = props.tarea.estado.charAt(0).toUpperCase() + props.tarea.estado.slice(1);
    const estadoColor = "success";
    return (
        <div>
            <Card>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <CardTitle tag="h3">{props.tarea.nombre}</CardTitle>
                            </Col>
                            <Col>
                                <h4><Badge color={estadoColor}>Iniciado{/*estadoString*/}</Badge></h4>
                            </Col>
                            <Col>
                                <CardText>{props.tarea.descripcion}</CardText>
                            </Col>
                            <Col>
                            </Col>
                            <Col body className="text-center">
                                <Link to={`/proyectos/${props.codigoProyecto}/tareas/${props.tarea.codigo}`}>
                                    <Button color="info">Ver Tarea</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </CardBody>
            </Card>
            <br />
        </div>
    );
}
