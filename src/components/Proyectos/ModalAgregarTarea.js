import React, { Component } from 'react';
import { Form, Button,  Modal, ModalHeader, ModalBody, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import './Modal.css';
import ModalAsignarRecurso from "../../components/Proyectos/ModalAsignarRecurso";


class ModalAgregarTarea extends Component {

    constructor() {
        super();
        this.state = {
            modalHeader: null,
            modalBody: null,
            modalOnClose: null,
            modal: false,
            modalTotal: false,
        }
        this.codigoRecurso = "";
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
    };

    crearTarea(){
        let url = `https://proyectopsa.herokuapp.com/proyectos/${this.id}/tarea/`;

        let nombreTarea = document.getElementById("nombreTarea").value;
        let fechaInicio = document.getElementById("fechaInicio").value;
        let descripcion = document.getElementById("descripcion").value;
        let fechaFin = document.getElementById("fechaFin").value;
        let prioridad = this.obtenerRadio("baja", "media", "alta");

        if (!this.validateRequiredEntries(nombreTarea, fechaInicio, prioridad)) return;
        if (fechaFin != '' && fechaInicio > fechaFin) return;

        let estado = this.obtenerRadio("iniciado", "enProceso", "finalizado", "en proceso");

        let data = {
            "nombre": nombreTarea,
            "fechaInicio": fechaInicio,
            "prioridad": prioridad,
            "fechaFin": fechaFin == '' ? undefined : fechaFin,
            "estado": estado == null ? undefined : estado ,
            "descripcion": descripcion,
            "codigoRecurso": this.codigoRecurso == "" ? undefined : this.codigoRecurso,
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
                    self.abrirModal("ÉXITO", `La tarea se generó exitosamente con código: ${json.codigo}`, () => self.props.history.push(`/proyectos/${self.id}/tareas`));
                } else {
                    self.abrirModal("ERROR DE LA REQUEST", json.description + json.validation, () => {});
                }
            })
            .catch(function(error) {
                self.abrirModal("ERROR DEL FETCH", error.message)
            });
    }

    asignarRecurso(){
        let self = this;

        const onClick = (legajo) => {  
            self.codigoRecurso = legajo;
            this.setState({
                modal: false,
            });
        };
        let content = (
            <div>
                <Form>
                    <FormGroup>
                        <ModalAsignarRecurso onClick={onClick} />
                    </FormGroup>
                </Form>
            </div>
        );
        this.abrirModal(
            "Asignar Recurso",
            content,
            () => {} 
        )
    }

    componentDidMount(){
        this.id = this.props.match.params.id;
    }

    abrirModal(header, body, onClose){
        this.setState({
            modalHeader: header,
            modalBody: body,
            modalOnClose: onClose,
            modal: true,
        })
    }

    obtenerRadio(radio1, radio2, radio3, differ=null){
        if (document.getElementById(radio1).checked) return radio1;
        if (document.getElementById(radio2).checked) return differ == null ? radio2 : differ;
        if (document.getElementById(radio3).checked) return radio3;
    }

    obtenerEstado(){
        if (document.getElementById("iniciado").checked) return 'iniciado';
        if (document.getElementById("enProceso").checked) return 'en proceso';
        if (document.getElementById("finalizado").checked) return 'finalizado';
    }

    validateRequiredEntries(nombreTarea, fechaInicio, prioridad){
        let valid = true;
        let nombreClassList = document.getElementById("nombre").classList;
        let fechaClassList = document.getElementById("startDate").classList;
        let prioridadClassList = document.getElementById("priority").classList;

        
        valid &= this.validate(nombreTarea, nombreClassList);
        valid &= this.validate(fechaInicio, fechaClassList);
        valid &= this.validatePriority(prioridadClassList);
        
        return valid;
    }

    validatePriority(classList){

        let baja = document.getElementById("baja");
        let media = document.getElementById("media");
        let alta = document.getElementById("alta");

        if (!baja.checked && !media.checked && !alta.checked){
            classList.add("incorrect");
            return false
        } else {
            classList.remove("incorrect");
        }

        return true
    }

    validate(element, classList){

        if (element == ''){
            classList.add("incorrect");
            return false;
        } else {
            classList.remove("incorrect");
        }

        return true;
    }

    render() {
        let self = this;
        const toggleModal = () => self.setState({modalTotal:!self.state.modalTotal});
        const toggleModalError = () => self.setState({modal: !self.state.modal});
        return (
            <div>
                <Button color="secondary" onClick={toggleModal}>Agregar Tarea</Button>

                <Modal isOpen={this.state.modalTotal} toggle={toggleModal}>
                    <ModalHeader id="header" toggle={toggleModal}>Nueva Tarea</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label className='parametro' for="nombreTarea" id='nombre'>Nombre Tarea *</Label>
                            <Input type="string" name="nombreTarea" id="nombreTarea" className='general' maxLength="256" required />
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="fechaInicio" id='startDate'>Fecha Inicio *</Label>
                            <Input type="date" name="fechaInicio" id="fechaInicio" className='general fecha' required/>
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="fechaFin" >Fecha Fin</Label>
                            <Input type="date" name="fechaFin" id="fechaFin" className='general fecha' />
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="recurso" id='recursoLabel'>Código Recurso</Label>
                            <Label id="labelRecurso">{this.codigoRecurso == "" ? "-" : this.codigoRecurso}</Label>
                            <Button id="botonRecurso" onClick={() => self.asignarRecurso()}>Seleccionar Recurso</Button>
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <Label className='parametro'>Estado</Label>
                                <FormGroup>
                                <Label className="radio" check>
                                    <Input type="radio" name='radio' id='iniciado'  />{' '}
                                    Iniciado
                                </Label>
                                <Label className="radio" check>
                                    <Input type="radio" name='radio' id='enProceso' />{' '}
                                    En Proceso
                                </Label>
                                <Label className="radio" check>
                                    <Input type="radio" name='radio' id='finalizado'  />{' '}
                                    Finalizado
                                </Label>
                                </FormGroup>
                        </FormGroup>
                        <FormGroup tag="fieldset">
                            <Label className='parametro' id='priority'>Prioridad *</Label>
                                <FormGroup>
                                <Label className="radio2" check>
                                    <Input type="radio" name='radio2' id='baja'  />{' '}
                                    Baja
                                </Label>
                                <Label className="radio2" check>
                                    <Input type="radio" name='radio2' id='media' />{' '}
                                    Media
                                </Label>
                                <Label className="radio2" check>
                                    <Input type="radio" name='radio2' id='alta'  />{' '}
                                    Alta
                                </Label>
                                </FormGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label className='parametro' for="descripcion" id='desc'>Descripción </Label>
                            <Input type="textarea" name="descripcion" id="descripcion" className='general' maxLength="256" required />
                        </FormGroup>
                        <Button onClick={() => this.crearTarea()}>Crear Tarea</Button>
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

export default withRouter(ModalAgregarTarea);    
