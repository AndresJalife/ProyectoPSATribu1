import React, { Component } from 'react';
import {Button, Table, Row, Col, Card, CardBody, Container} from 'reactstrap';
import HoursModel from "../../models/CargaDeHoras/HoursModel";
import PropTypes from "prop-types";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";

export default class GridItemHours extends Component {
    static propTypes = {
        hours: PropTypes.object.isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            nameProject: "",
            nameTask: ""
        };
    }

    componentDidMount() {

        let url = 'https://proyectopsa.herokuapp.com/proyectos/' +
                   this.props.hours.idProject.toString() + '/tarea/' +
                   this.props.hours.idTask.toString();


        fetch(url)
            .then(r => r.json())
            .then((taskByProject) =>
            {

                let nameTask = "-",
                    nameProject = "-";

                if (taskByProject.tarea != null){
                    nameTask = taskByProject.tarea.nombre;
                    nameProject = taskByProject.tarea.nombreProyecto;
                }

                this.setState({
                    isLoading: false,
                    nameProject: nameProject,
                    nameTask: nameTask
                });
            }, (error) => {console.log(error);});
    }

    render(){
        return (

            this.state.isLoading ?
                    <tr>
                        <td colSpan={7}>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={15}
                                width={15}></Loader>
                        </td>
                    </tr>
                :
                    <tr>
                        <td>{this.state.nameProject}</td>
                        <td>{this.state.nameTask}</td>
                        <td>{this.props.hours.getDateAsString()}</td>
                        <td>{this.props.hours.quantityHours}</td>
                        <td>{this.props.hours.quantityMinutes}</td>
                        <td>
                            <button type="button" className="btn btn-sm btn-rounded " style={{marginTop: "-7px", color: "blue"}}>
                                <FaPencilAlt/>
                            </button>
                        </td>
                        <td>
                            <button type="button" className="btn btn-sm btn-rounded " style={{marginTop: "-7px", color: "red"}}>
                                <FaTrashAlt/>
                            </button>
                        </td>
                    </tr>
        )
    }
}