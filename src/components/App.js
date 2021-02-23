import logo from '../logo.svg';
import './App.css';
import React from "react";
import CargaDeHorasPage from '../pages/CargaDeHoras/CargaDeHorasPage';
import MainProyectosPage from '../pages/Proyectos/MainProyectosPage';
import AgregarProyectoPage from '../pages/Proyectos/AgregarProyectoPage';
import RecursosPage from './../pages/Recursos/RecursosPage';
import Soporte from './../pages/Soporte';
import Main from './../pages/Main';
import {Route, Switch} from "react-router";
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import ProyectoPage from "../pages/Proyectos/ProyectoPage";
import {Link, useHistory} from "react-router-dom";
import MainTareasPage from "../pages/Proyectos/MainTareasPage";
import { FaHome } from "react-icons/fa";

function App(props) {
    const history = useHistory();

  return (
    <div className="App">
        <header className="App-header-ppal">
            <div id='headerContainer' className="MuiToolbar-root MuiToolbar-root App-subheader-height MuiToolbar-gutters">
                <div id='homeButton' onClick={() => history.push('')}>
                    <Col xl={12} lg={12}> {/*????*/}
                        <FaHome/> HOME
                    </Col>
                </div>
                <div id='companyName'>
                    <Col xl={12} lg={12}>
                        PSA
                    </Col>
                </div>
            </div>
            
        </header>

        <main>
            <Switch>
                <Route exact path="/ProyectoPSATribu1/proyectos" component={MainProyectosPage} />
                <Route exact path="/ProyectoPSATribu1/proyectos/nuevoProyecto" component={AgregarProyectoPage}/>
                <Route exact path="/ProyectoPSATribu1/proyectos/:id" component={ProyectoPage} />
                <Route exact path="/ProyectoPSATribu1/proyectos/:id/tareas" component={MainTareasPage} />
                <Route exact path="/ProyectoPSATribu1/" component={Main} />
                <Route exact path="/ProyectoPSATribu1/recursos" component={RecursosPage} />
                <Route exact path="/ProyectoPSATribu1/cargadehoras/:id" component={CargaDeHorasPage} />
                <Route exact path="/ProyectoPSATribu1/soporte" component={Soporte} />
            </Switch>
        </main>
    </div>
  );
}

export default App;
