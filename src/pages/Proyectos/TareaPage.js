import React, { Component } from 'react'
import { Row, Card, CardBody, CardTitle, CardText, Button,  Col } from 'reactstrap';
import {Form, FormGroup, Label, Input } from 'reactstrap';
import './TareaPage.css';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";


class TareaPage extends Component {

    constructor(){
        super();
        this.state = {
            tarea: [],
            modal: false,
            errorModal: false,
            modalBody: null,
            modalHeader: null,
            acceptModalButton: null,
            errorMessage: "",
            prioridad: "",
            estado: "",
            codigoRecurso: "",
            fechaFin: "",
        }
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    asignarRecurso(){
        let self = this;
        let content = (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="codigoRecurso" id="codigoRecursoLabel">Código Recurso:</Label>
                        <Input type="number" name="codigoRecurso" id="codigoRecurso" />
                    </FormGroup>
                </Form>
            </div>
        );
        this.abrirModal(
            "Asignar Recurso",
            content,
            () => {
                let codigoRecurso = document.getElementById("codigoRecurso").value;
                if (!self.validateInputText(codigoRecurso, "codigoRecursoLabel")) return;

                if (!self.validateRecurso(codigoRecurso)) {
                    // self.setState({
                    // })
                    //TODO: validar que exista un recurso con ese código
                    // si es valido asignarselo mediante el endpoint del squad6
                    // si es invalido, pedirlo devuelta.
                }

                self.patch({

                }, "https://..." /*pasarle la url del endpoint del squad6 para patch*/);

                this.setState({modal:false});
            }
        )
    }

    modificarPrioridad(){
        let self = this;
        let content = (
            <div>
                <Form>
                    <FormGroup tag="fieldset">
                        <Label className='parametro' id='priorityLabel'>Prioridad</Label>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name='radio2' id='bajaTarea'  />{' '}
                                Baja
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name='radio2' id='mediaTarea' />{' '}
                                Media
                            </Label>
                        </FormGroup>
                        <FormGroup check >
                            <Label check>
                                <Input type="radio" name='radio2' id='altaTarea'  />{' '}
                                Alta
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Form>
            </div>
        );
        this.abrirModal(
            "Modificar Prioridad",
            content,
            () => {
                if (!self.validarRadio(["bajaTarea", "mediaTarea", "altaTarea"], "priorityLabel")) return;
                    let prioridad = self.obtenerRadio("bajaTarea", "mediaTarea", "altaTarea", 
                                                            "baja", "media", "alta");
                    self.patch({
                        "prioridad":prioridad
                    });
    
                    self.setState({modal:false});

            }
        )
    }

    modificarFechaFinal(){
        let self = this;
        let content = (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="fechaFinal" id="fechaFinalLabel" >Fecha Fin:</Label>
                        <Input type="date" name="fechaFinal" id="fechaFinal"/>
                    </FormGroup>
                </Form>
            </div>
        );

        this.abrirModal(
            "Modificar Fecha Final",
            content,
            () => {
                let fechaFinal = document.getElementById("fechaFinal").value;
                if(!self.validateInputText(fechaFinal, "fechaFinalLabel")) return;
                
                self.patch({
                    "fechaFin":fechaFinal
                });

                self.setState({modal:false});
            }
        )
    }

    modificarEstado(){
        let self = this;
        let content = (
            <div>
                <Form>
                    <FormGroup tag="fieldset">
                        <Label id="estadoLabel">Estado</Label>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name='radio' id='iniciadoTarea'  />{' '}
                                Iniciado
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name='radio' id='enProcesoTarea' />{' '}
                                En Proceso
                            </Label>
                        </FormGroup>
                        <FormGroup check >
                            <Label check>
                                <Input type="radio" name='radio' id='finalizadoTarea'  />{' '}
                                Finalizado
                            </Label>
                        </FormGroup>
                    </FormGroup>
                </Form>
            </div>
        );
        this.abrirModal(
            "Modificar Estado",
            content,
            () => {
                if (!self.validarRadio(["iniciadoTarea", "enProcesoTarea", "finalizadoTarea"], "estadoLabel")) return;
                let estado = self.obtenerRadio("iniciadoTarea", "enProcesoTarea", "finalizadoTarea", 
                                                      "iniciado", "en proceso", "finalizado");
                self.patch({
                    "estado":estado
                });

                self.setState({modal:false});
            }
        )
    }
    
    patch(data, url){
        if (url == null) {
            url = `https://proyectopsa.herokuapp.com/proyectos/${this.state.tarea.nombreProyecto}/tarea/${this.state.tarea.codigo}`;
        }
        let self = this;
        console.log(url);
        fetch(url, {
            method: 'PATCH', 
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(function(json) {
              if(json.codigo) {
                  self.setState(data);
                  return;
              } else {
                    self.setState({
                        errorMessage : json.descripcion + json.validation,
                        errorModal: true,
                    })
              }
          })
          .catch(function(error) {
                self.setState({
                    errorMessage : error.message,
                    errorModal: true,
                })
          });
    }


    obtenerRadio(radio1, radio2, radio3, result1, result2, result3){
        if (document.getElementById(radio1).checked) return result1;
        if (document.getElementById(radio2).checked) return result2;
        if (document.getElementById(radio3).checked) return result3;
    }

    validarRadio(elements, labelID){
        let labelClassList = document.getElementById(labelID).classList;

        let primero = document.getElementById(elements[0]);
        let segundo = document.getElementById(elements[1]);
        let tercero = document.getElementById(elements[2]);

        if (!primero.checked && !segundo.checked && !tercero.checked){
            labelClassList.add("incorrect");
            return false
        } else {
            labelClassList.remove("incorrect");
        }

        return true
    }

    
    validateInputText(value, classListId){
        if (value == null || value == ''){
            let label = document.getElementById(classListId);
            label.classList.add("incorrect");
            
            return false;
        }
        return true;
    }

    abrirModal(header, body, acceptButton){
        this.setState({
            modalHeader: header,
            modalBody: body,
            acceptModalButton: acceptButton,
            modal: true,
        })
    }

    componentDidMount(){
        this.tareaID = this.props.match.params.idtarea;
        this.proyectoID = this.props.match.params.id;

        fetch(`https://proyectopsa.herokuapp.com/proyectos/${this.proyectoID}/tarea/${this.tareaID}`)
            .then(r => r.json())
            .then((tarea) =>
            {
                let trueTarea = tarea['tarea'];
                this.setState({
                    tarea: trueTarea,
                    prioridad: trueTarea.prioridad,
                    estado: trueTarea.estado,
                    fechaFin: trueTarea.fechaFin,
                    codigoRecurso: trueTarea.codigoRecurso,
                });
            }, (error) => {console.log(error);});
    }

    render() {
        const tarea = this.state.tarea;
        let self = this;
        const toggleModal = () =>self.setState({modal:!self.state.modal});
        const toggleErrorModal = () => self.setState({errorModal: !self.state.errorModal});
        const closeBtn = <Button id="closebtn" onClick={() => self.setState({errorModal:false})}> X </Button>
        return (
            <div id='paginaTareas'>
                <div id='subheaderTarea'>
                    <br/>
                    <h1>{tarea.nombre}</h1>
                </div>
                <div id='cardsContainer'> 
                    <Row>
                        <Col sm="6">
                            <div id='cardGeneral' className='card'>
                                <Card body>
                                <CardTitle className="cardTitle" tag="h5">General</CardTitle>
                            
                                <CardText><b>Descripción:</b> {tarea.descripcion}</CardText>
                                <div id='infoCodigos'>
                                    <p className='cardText'><b>Código Tarea:</b> {tarea.codigo}.</p>
                                    <p className='cardText'><b>Código Proyecto:</b> {tarea.codigoProyecto}.</p>
                                    <p className='cardText'><b>Nombre Proyecto:</b> {tarea.nombreProyecto}</p>
                                </div>
                                
                                </Card>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="6">
                            <div id='cardRecursos' className='card cardsLeft'>
                                <Card body>
                                <CardTitle className="cardTitle" tag="h5">Recursos</CardTitle>
                                <CardText id="recursosText"><b>Código Recurso:</b> {this.state.codigoRecurso == null ? "Ningún recurso asignado" : tarea.codigoRecurso}</CardText>
                                <Button id="recursosButton" onClick={() => this.asignarRecurso()}>Asignar Recurso</Button>
                                </Card>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div id='cardFechas' className='card cardsRight'>
                                <Card body>
                                <CardTitle tag="h5" className="cardTitle">Fechas</CardTitle>
                                <CardText><b>Fecha Inicial:</b> {tarea.fechaInicio}</CardText>
                                <CardText><b>Fecha Final:</b> {this.state.fechaFin == null ? "No hay fecha final" : this.state.fechaFin}</CardText>
                                <Button onClick={() => this.modificarFechaFinal()}>Modificar Fecha Final </Button>
                                </Card>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div id='cardEstado' className='card cardsLeft'>
                                <Card body>
                                <CardTitle className="cardTitle" tag="h5">Estado</CardTitle>
                                <CardText className={this.state.estado}>{this.state.estado}</CardText>
                                <Button onClick={() => this.modificarEstado()}>Modificar Estado</Button>
                                </Card>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div id='cardPrioridad' className='card cardsRight'>
                                <Card body>
                                <CardTitle className="cardTitle" tag="h5">Prioridad</CardTitle>
                                <CardText className={this.state.prioridad + " prioridadValue"}>{this.state.prioridad}</CardText>
                                <Button onClick={() => this.modificarPrioridad()}>Modificar Prioridad </Button>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div id="modals">
                    <Modal isOpen={this.state.modal} toggle={toggleModal}>
                        <ModalHeader toggle={toggleModal}>{this.state.modalHeader}</ModalHeader>
                        <ModalBody>
                            {this.state.modalBody}
                        </ModalBody>
                        <Button onClick={this.state.acceptModalButton} id="boton">
                            Aceptar
                        </Button>
                    </Modal>
                    <Modal isOpen={this.state.errorModal} toggle={toggleErrorModal}>
                        <ModalHeader toggle={toggleModal} close={closeBtn}>ERROR</ModalHeader>
                        <ModalBody>
                            {this.state.errorMessage}
                        </ModalBody>
                        <Button onClick={() => self.setState({errorModal:false})} id="boton">
                            Cancelar
                        </Button>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default withRouter(TareaPage);
