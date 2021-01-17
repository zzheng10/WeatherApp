import './App.css';
import NavBar from './AppComponents/NavBar'
import Weather from './AppComponents/Weather'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar className="NavBar" />
        <div className="router">
          <Link to="/">Home</Link>
          <br />
          <Link to="/about">About</Link>
          <br />
          <Link to="/search">Weather App</Link>
          <br />
        </div>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Router path="/search">
            <Weather />
          </Router>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Weather App!</h1>
      <img src= "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" width="300" height="300" alt="weather-logo" />
      <h1>Made by Zach Zheng</h1>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>This app was made entirely using React</h2>
      <h3>To begin, press the weather app link above.</h3>
      <h3>Then, input any city into the search bar to view a five day forecast for that city.</h3>
    </div>
  )
}

export default App;
