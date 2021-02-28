import React, {Component} from "react";
import {Col, Row, Table} from "reactstrap";
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";

export default class ModalAsignarRecurso extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isLoading: true,
            lstResources: []
        }
    }

    componentDidMount() {
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

    render()
    {
        return this.state.isLoading ?
                <Row>
                    <Col className="text-center">
                        <Loader
                            type="TailSpin"
                            color="#00BFFF"
                            height={50}
                            width={50}></Loader>
                    </Col>
                </Row>
                :<Row>
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
                                        <button type="button"  className="btn btn-outline-primary btn-sm" onClick={() => this.props.onClick(r.legajo)}>
                                            Seleccionar recurso
                                        </button>
                                    </td>
                                </tr>

                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>;
    }
}