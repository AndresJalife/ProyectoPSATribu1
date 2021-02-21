import logo from '../logo.svg';
import './App.css';
import React from "react";
import CargaDeHorasPage from '../pages/CargaDeHoras/CargaDeHorasPage';
import MainProyectosPage from '../pages/Proyectos/MainProyectosPage';
import AgregarProyectoPage from '../pages/Proyectos/AgregarProyectoPage';
import Recursos from './../pages/Recursos';
import Soporte from './../pages/Soporte';
import Main from './../pages/Main';
import {Route, Switch} from "react-router";
import { Button, ButtonToolbar, Row, Col } from 'reactstrap';
import ProyectoPage from "../pages/Proyectos/ProyectoPage";
import {Link} from "react-router-dom";

function App(props) {
  return (
    <div className="App">
        <header
            className="App-header-ppal">
            <div className="MuiToolbar-root MuiToolbar-root App-subheader-height MuiToolbar-gutters">
                    <Col xl={12} lg={12}>
                        PSA
                    </Col>
            </div>
        </header>

        <main>
            <Switch>
                <Route exact path="/proyectos" component={MainProyectosPage} />
                <Route exact path="/proyectos/nuevoProyecto" component={AgregarProyectoPage}/>
                <Route exact path="/proyectos/:id" component={ProyectoPage} />
                <Route exact path="/" component={Main} />
                <Route exact path="/recursos" component={Recursos} />
                <Route exact path="/cargadehoras" component={CargaDeHorasPage} />
                <Route exact path="/soporte" component={Soporte} />
            </Switch>
        </main>

        <footer>
            PSA 2021
        </footer>
    </div>
  );
}

export default App;
