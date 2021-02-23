import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, Container, Badge
} from 'reactstrap';

export default function TareaCard (props)
{
    const estadoString = props.project.estado.charAt(0).toUpperCase() + props.project.estado.slice(1);
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
                                <h4><Badge color={estadoColor}>{estadoString}</Badge></h4>
                            </Col>
                            <Col>
                                <CardText>{props.tarea.descripcion}</CardText>
                            </Col>
                            <Col>
                            </Col>
                            <Col body className="text-center">
                                <Link to={`/ProyectoPSATribu1/proyectos/${props.codigoProyecto}/tarea/${props.tarea.codigo}`}>
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
