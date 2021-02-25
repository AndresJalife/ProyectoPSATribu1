import React, { Component } from 'react';
import {Button, Table, Row, Col, Card, CardBody, Container} from 'reactstrap';
import HoursModel from "../../models/CargaDeHoras/HoursModel";
import PropTypes from "prop-types";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import {Link} from "react-router-dom";
import Loader from "react-loader-spinner";
import swal from "sweetalert2";
import ModalModifyHours from "./ModalModifyHours";

export default class GridItemHours extends Component {
    static propTypes = {
        hours: PropTypes.object.isRequired,
        onReload: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            nameProject: "",
            nameTask: ""
        };

        this.deleteHoursById = this.deleteHoursById.bind(this);
    }

    deleteHoursById(){
        let url = 'https://squad6-backend.herokuapp.com/hours/' + this.props.hours.id;

        swal.fire({
            title: 'Eliminar la hora',
            text: "¿Estás seguro que desea eliminar " + this.props.hours.getHoursAsString() + " horas del " + this.props.hours.getDateAsString() + "?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            dangerMode: 'true',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(answer=>{
            if(answer.isConfirmed){
                this.setState({isLoading: true});
                fetch(url, {
                    method: 'DELETE'}).then(() => {
                    swal.fire({
                        title: "Se borraron " + this.props.hours.getHoursAsString() + " horas del " + this.props.hours.getDateAsString() + " con éxito." ,
                        icon: "success"});
                    this.setState({isLoading: false});
                    this.props.onReload();
                })
            }
        });
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
                            <ModalModifyHours hours={this.props.hours} onReload={this.props.onReload}> </ModalModifyHours>
                        </td>
                        <td>
                            <button type="button" className="btn btn-sm btn-rounded" onClick = {this.deleteHoursById} style={{marginTop: "-7px", color: "red"}}>
                                <FaTrashAlt/>
                            </button>
                        </td>
                    </tr>
        )
    }
}