import React, { Component } from 'react'
import {Link, useHistory} from "react-router-dom"
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row, Container
} from 'reactstrap';

export default function ProyectoCard (props)
{
    const history = useHistory();
    const onClickHandler = () =>
    {
        history.push(`/proyectos/${props.project.id}`);
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <CardTitle tag="h5">{props.project.nombre}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{}</CardSubtitle>
                            </Col>
                            <Col>
                                <CardText>{props.project.descripcion}</CardText>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                                <Link to={`/proyectos/${props.project.codigo}`}>
                                <Button color="primary">Ir al proyecto</Button>
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
