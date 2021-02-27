import React, { Component } from 'react';
import { Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import './Modal.css';

class ModalAgregarProyecto extends Component {

    constructor() {
        super();
        this.state = {
            modalHeader: null,
            modalBody: null,
            modalOnClose: null,
            modal: false,
            modalTotal: false,
        }
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    crearProyecto(){
        let url = "https://proyectopsa.herokuapp.com/proyectos/";

        let nombreProyecto = document.getElementById("nombreProyecto").value;
        let fechaInicio = document.getElementById("fechaInicio").value;
        let descripcion = document.getElementById("descripcion").value;
        let fechaFin = document.getElementById("fechaFin").value;
        let horas = document.getElementById("horas").value;
        let presupuesto = document.getElementById("presupuesto").value;

        if (!this.validateRequiredEntries(nombreProyecto, fechaInicio, descripcion)) return;
        if (fechaFin != '' && fechaInicio > fechaFin) return;

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
                    self.setState({modalTotal:false});
                    self.props.onClose();
                    self.abrirModal("ÉXITO", `El proyecto se generó exitosamente con código: ${json.codigo}`, () => {});
                } else {
                    self.abrirModal("ERROR", json.description +  json.validation, () => {});
                }
            })
            .catch(function(error) {
                self.abrirModal("ERROR", error.message, () => {})
            });
    }

    abrirModal(header, body, onClose){
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
        
        valid &= this.validate(nombreProyecto, nombreClassList);
        valid &= this.validate(fechaInicio, fechaClassList);
        valid &= this.validate(descripcion, descClassList);
        return valid;
    }

    validate(element, classList){
        let valid = true;

        if (element == ''){
            classList.add("incorrect");
            valid = false;
        } else {
            classList.remove("incorrect");
        }

        return valid;
    }   

    render() {
        let self = this;
        const toggleModal = () => self.setState({modalTotal:!self.state.modalTotal});
        const toggleModalError = () => self.setState({modal: !self.state.modal});
        return (
            <div>
                <Button color="secondary" onClick={toggleModal}>Agregar Proyecto</Button>

                <Modal isOpen={this.state.modalTotal} toggle={toggleModal}>
                    <ModalHeader id="header" toggle={toggleModal}>Nuevo Proyecto</ModalHeader>
                    <ModalBody>
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
                                <Label check className="radio">
                                    <Input type="radio" name='radio' id='iniciado'  />{' '}
                                    Iniciado
                                </Label>
                                <Label check className="radio">
                                    <Input type="radio" name='radio' id='enProceso' />{' '}
                                    En Proceso
                                </Label>
                                <Label check className="radio">
                                    <Input type="radio" name='radio' id='finalizado'  />{' '}
                                    Finalizado
                                </Label>
                            </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="horas">Horas</Label>
                            <Input type="number" name="horas" id="horas" className='general' min={0} />
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="presupuesto" >Presupuesto</Label>
                            <Input type="number" name="presupuesto" id="presupuesto" className='general' min={0} />
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="descripcion" id='desc'>Descripción *</Label>
                            <Input type="textarea" name="descripcion" id="descripcion" className='general' maxLength="256" required />
                        </FormGroup>
                        <Button onClick={() => this.crearProyecto()}>Crear Proyecto</Button>
                        <label id='requisitosLabel'>(*) para aquellos campos que sean requeridos obligatoriamente</label>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modal} toggle={toggleModalError} className='popupError' onClosed={this.state.modalOnClose}>
                    <ModalHeader toggle={toggleModalError}>{this.state.modalHeader}</ModalHeader>
                    <ModalBody>
                        {this.state.modalBody}
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default withRouter(ModalAgregarProyecto);    
