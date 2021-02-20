import logo from '../logo.svg';
import './App.css';

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <p>Pagina Principal</p>
        <button onClick={}>Proyectos</button>
        <button onClick={}>Recursos</button>
        <button onClick={}>Soporte y carga de horas</button>
      </header>

      <main>
        {props.children}
      </main>

      <footer>
        Your copyright message
      </footer>
    </div>
  );
}

export default App;
