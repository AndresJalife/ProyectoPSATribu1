import React, { Component } from 'react'
import {Button, Table, Row, Col, Card, CardBody, Container, CardHeader, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import HoursModel from "../../models/CargaDeHoras/HoursModel";
import { FaRegHandPointer } from 'react-icons/fa'
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";

export default class RecursosPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            lstResources: []
        };
    }

    componentDidMount()
    {
        fetch('https://squad6-backend.herokuapp.com/resources')
            .then(r => r.json())
            .then((resources) =>
            {
                this.setState({
                    isLoading: false,
                    lstResources: resources
                });
            }, (error) => {console.log(error);});
    }

    render() {
        return (
            <div className="block" style={{padding: 10 + 'px'}}>

                <Row>
                    <Col xl={12} lg={12}>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Recursos</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row>
                    <Col xl={{size: 6, offset: 3}}>
                        <Card>
                            <CardHeader tag="h2">Recursos</CardHeader>

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
                                                        <th>Legajo</th>
                                                        <th>Nombre</th>
                                                        <th>Apellido</th>
                                                        <th>Seleccionar</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {this.state.lstResources.map((r) =>
                                                        <tr key={r.legajo}>
                                                            <td>{r.legajo}</td>
                                                            <td>{r.Nombre}</td>
                                                            <td>{r.Apellido}</td>
                                                            <td>
                                                                <Link to={`/cargadehoras/${r.legajo}`}>
                                                                    <button type="button"  className="btn btn-outline-primary btn-sm">
                                                                        Ver recurso
                                                                    </button>
                                                                </Link>

                                                            </td>
                                                        </tr>

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
        )
    }
}