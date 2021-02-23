import React, { Component } from 'react'
import {Link, useHistory} from "react-router-dom"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, Container, Badge
} from 'reactstrap';

export default function ProyectoCard (props)
{
    const history = useHistory();
    const onClickHandler = () =>
    {
        history.push(`/proyectos/${props.project.id}`);
    }
    const estadoString = props.project.estado.charAt(0).toUpperCase() + props.project.estado.slice(1);
    const estadoColor = "success";
    return (
        <div>
            <Card>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <CardTitle tag="h4">{props.project.nombre}</CardTitle>
                            </Col>
                            <Col>
                                <h4><Badge color={estadoColor}>{estadoString}</Badge></h4>
                            </Col>
                            <Col>
                                <CardText>{props.project.descripcion}</CardText>
                            </Col>
                            <Col>
                            </Col>
                            <Col body className="text-center">
                                <Link to={`/proyectos/${props.project.codigo}`}>
                                <Button color="info">Ver Tareas</Button>
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
