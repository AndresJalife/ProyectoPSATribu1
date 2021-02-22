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
            modalHeader: null,
            modalBody: null,
            modalOnClose: null,
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
            "nombre": nombreProyecto,
            "fechaInicio": fechaInicio,
            "fechaFin": fechaFin == '' ? undefined : fechaFin,
            "estado": estado == null ? undefined : estado ,
            "horas": horas == "" ? undefined : parseInt(horas) ,
            "presupuesto": presupuesto == '' ? undefined : parseInt(presupuesto),
            "descripcion": descripcion
        };
        
        let self = this;

        fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(function(json) {
                if(json.codigo) {
                    self.abrirModal("ÉXITO", `El proyecto se realizó exitosamente con código: ${json.codigo}`, () => self.props.history.push(`/proyectos/`));
                } else {
                    self.abrirModal("ERROR", json.description, json.validation);
                }
            })
            .catch(function(error) {
                self.abrirModal("ERROR", error.message)
            });
    }

    abrirModal(header, body, onClose=null){
        this.setState({
            modalHeader: header,
            modalBody: body,
            modalOnClose: onClose,
            modal: true,
        })
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
                            <Label className='parametro' for="horas">Horas</Label>
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
                    <label id='requisitosLabel'>(*) para aquellos campos que sean requeridos obligatoriamente</label>
                </div>
                <Modal isOpen={this.state.modal} toggle={toggleModal} className='popupError' onClosed={this.state.modalOnClose}>
                    <ModalHeader toggle={toggleModal}>{this.state.modalHeader}</ModalHeader>
                    <ModalBody>
                        {this.state.modalBody}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(AgregarProyectoPage);