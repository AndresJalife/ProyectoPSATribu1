import './App.css';
import React from "react";
import CargaDeHorasPage from '../pages/CargaDeHoras/CargaDeHorasPage';
import MainProyectosPage from '../pages/Proyectos/MainProyectosPage';
import AgregarProyectoPage from '../pages/Proyectos/AgregarProyectoPage';
import RecursosPage from './../pages/Recursos/RecursosPage';
import TareaPage from '../pages/Proyectos/TareaPage';
import Soporte from './../pages/Soporte/Soporte';
import TicketDetail from './../pages/Soporte/DetalleTicket';
import Main from './../pages/Main';
import {Route, Switch} from "react-router";
import { Col } from 'reactstrap';
import { useHistory} from "react-router-dom";
import MainTareasPage from "../pages/Proyectos/MainTareasPage";
import { FaHome } from "react-icons/fa";
import AgregarTareaPage from '../pages/Proyectos/AgregarTareaPage';

function App(props) {
    const history = useHistory();

  return (
    <div className="App">
        <header className="App-header-ppal">
            <div id='headerContainer' className="MuiToolbar-root MuiToolbar-root App-subheader-height MuiToolbar-gutters">
                <div id='homeButton' onClick={() => history.push('/')}>
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
                <Route exact path="/proyectos" component={MainProyectosPage} />
                <Route exact path="/nuevoProyecto" component={AgregarProyectoPage}/>
                <Route exact path="/proyectos/:id/tareas" component={MainTareasPage} />
                <Route exact path="/proyectos/:id/tareas/:idtarea" component={TareaPage} />
                <Route exact path="/" component={Main} />
                <Route exact path="/recursos" component={RecursosPage} />
                <Route exact path="/cargadehoras/:id" component={CargaDeHorasPage} />
                <Route exact path="/soporte" component={Soporte} />
                <Route path="/soporte/ticket_detail" component={TicketDetail} />
                <Route exact path="/proyectos/:id/nuevaTarea" component={AgregarTareaPage} />
            </Switch>
        </main>
    </div>
  );
}

export default App;
