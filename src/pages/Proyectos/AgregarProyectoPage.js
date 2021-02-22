import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import './AgregarProyectoPage.css';

class AgregarProyectoPage extends Component {

    constructor() {
        super();
        this.state = {
            fetchError: null,
            modal: false,
        }
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    crearProyecto(){

        let url = "https://proyectopsa.herokuapp.com/proyectos/";

        let nombreProyecto = document.getElementById("nombreProyecto").value;
        let fechaInicio = document.getElementById("fechaInicio").value;
        let descripcion = document.getElementById("descripcion").value;
        let fechaFin = document.getElementById("fechaFin").value;
        let horas = document.getElementById("horas").value;
        let presupuesto = document.getElementById("presupuesto").value;

        let isValid = this.validateRequiredEntries(nombreProyecto, fechaInicio, descripcion);
        if (!isValid) return;

        let estado = this.obtenerEstado();

        let data = {
            nombreProyecto: nombreProyecto,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin == '' ? undefined : fechaFin,
            estado: estado == null ? undefined : estado,
            horas: horas == null ? undefined : horas,
            presupuesto: presupuesto == '' ? undefined : presupuesto,
            descripcion: descripcion
        };
        
        let self = this;

        fetch(url, {method:'POST', body:data, mode:'no-cors'})
            .then(function(response) {
                if(response.ok) {
                    this.history.push(`/proyectos/`)
                } else {
                    self.setState({
                        fetchError: 'Respuesta de red OK pero respuesta HTTP no OK',
                        modal: true,
                    })
                }
            })
            .catch(function(error) {
                self.setState({
                    fetchError: error.message,
                    modal: true,
                })
            });
    }

    obtenerEstado(){
        if (document.getElementById("iniciado").checked) return 'iniciado';
        if (document.getElementById("enProceso").checked) return 'en proceso';
        if (document.getElementById("finalizado").checked) return 'finalizado';
    }

    validateRequiredEntries(nombreProyecto, fechaInicio, descripcion){
        let valid = true;
        let nombreClassList = document.getElementById("nombre").classList;
        let fechaClassList = document.getElementById("startDate").classList;
        let descClassList = document.getElementById("desc").classList;
        
        if (nombreProyecto == ''){
            nombreClassList.add("incorrect");
            valid = false;
        } else {
            nombreClassList.remove("incorrect");
        }

        if (fechaInicio == ''){
            fechaClassList.add("incorrect");
            valid = false;
        } else {
            fechaClassList.remove("incorrect");
        }

        if (descripcion == ''){
            descClassList.add("incorrect");
            valid = false;
        } else {
            descClassList.remove("incorrect");
        }
        
        return valid;
    }

    render() {
        let self = this;
        const toggleModal = () =>self.setState({modal:!self.state.modal});

        return (
            <div>
                <div className='formContainer'>
                    <Form>
                        <FormGroup>
                            <Label className='parametro' for="nombreProyecto" id='nombre'>Nombre Proyecto *</Label>
                            <Input type="string" name="nombreProyecto" id="nombreProyecto" className='general' maxLength="256" required />
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="fechaInicio" id='startDate'>Fecha Inicio *</Label>
                            <Input type="date" name="fechaInicio" id="fechaInicio" className='general fecha' required/>
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="fechaFin" >Fecha Fin</Label>
                            <Input type="date" name="fechaFin" id="fechaFin" className='general fecha' />
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <Label className='parametro'>Estado</Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name='radio' id='iniciado'  />{' '}
                                    Iniciado
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name='radio' id='enProceso' />{' '}
                                    En Proceso
                                </Label>
                            </FormGroup>
                            <FormGroup check >
                            <Label check>
                                <Input type="radio" name='radio' id='finalizado'  />{' '}
                                Finalizado
                            </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="horas" >Horas</Label>
                            <Input type="number" name="horas" id="horas" className='general' />
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="presupuesto" >Presupuesto</Label>
                            <Input type="number" name="presupuesto" id="presupuesto" className='general' />
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="descripcion" id='desc'>Descripción *</Label>
                            <Input type="textarea" name="descripcion" id="descripcion" className='general' maxLength="256" required />
                        </FormGroup>
                        <Button onClick={() => this.crearProyecto()}>Crear Proyecto</Button>
                    </Form>
                    <label>(*) para aquellos campos que sean requeridos obligatoriamente</label>
                </div>
                <Modal isOpen={this.state.modal} toggle={toggleModal} className='popupError'>
                    <ModalHeader toggle={toggleModal}>ERROR</ModalHeader>
                    <ModalBody>
                        Hubo un problema con la creación del proyecto.
                        Error: {this.state.fetchError}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(AgregarProyectoPage);