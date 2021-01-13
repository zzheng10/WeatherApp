import './App.css';
import NavBar from './AppComponents/NavBar'
import Weather from './AppComponents/Weather'

function App() {
  return (
    <div className="App">
      <NavBar className="NavBar" />
      <Weather />
    </div>
  );
}

export default App;
