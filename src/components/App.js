import logo from '../logo.svg';
import './App.css';
import React from "react";
import CargaDeHorasPage from '../pages/CargaDeHoras/CargaDeHorasPage';
import MainProyectos from '../pages/Proyectos/MainProyectos';
import Recursos from './../pages/Recursos';
import Soporte from './../pages/Soporte';
import Main from './../pages/Main';
import {Route, Switch} from "react-router";

function App(props) {
  return (
    <div className="App">
        <header>
            PSA
        </header>

        <main>
            <Switch>
                <Route exact path="/proyectos" component={MainProyectos} />
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
