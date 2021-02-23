import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardHeader, CardTitle,
    CardSubtitle, Button, Label, ButtonToolbar, Row, Col, Container, Badge
} from 'reactstrap';
import ModalHours from '../../components/CargaDeHoras/ModalHours';
import {Link} from "react-router-dom";

export default class CargaDeHorasPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            resource: { }
        };
    }

    componentDidMount()
    {
        const id = this.props.match.params.id;
        fetch(`https://squad6-backend.herokuapp.com/resources/${id}`)
            .then(r => r.json())
            .then((resource) =>
            {
                this.setState({
                   resource: resource
                });
            }, (error) => {console.log(error);});
    }

    render() {
        return (
            <div style={{padding: 10 + 'px'}}>
                <Row>

                    <Col xl={4} lg={4}>
                        <Card>
                            <CardHeader tag="h4">Datos Principales</CardHeader>

                            <CardBody>
                                <Container>
                                    <Row>
                                        <Col xl={4} lg={4}>
                                            <CardTitle tag="h6">Legajo</CardTitle>
                                            <CardText>{this.state.resource.legajo}</CardText>
                                        </Col>

                                        <Col xl={4} lg={4}>
                                            <CardTitle tag="h6">Nombre</CardTitle>
                                            <CardText>{this.state.resource.Nombre}</CardText>
                                        </Col>

                                        <Col xl={4} lg={4}>
                                            <CardTitle tag="h6">Apellido</CardTitle>
                                            <CardText>{this.state.resource.Apellido}</CardText>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xl={8} lg={8}>
                        <ButtonToolbar>
                            <ModalHours></ModalHours>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </div>
        )
    }
}