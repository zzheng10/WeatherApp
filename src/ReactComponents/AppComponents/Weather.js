import React from "react"
import WeatherComponent from "./WeatherComponent"
import "./WeatherDisplay.css"

class Weather extends React.Component {
    constructor() {
        super()
        this.state = {
            city: "",
            showWeather: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit() {
        this.setState(prevState => ({ showWeather: !prevState.showWeather }))
    }

    handleReset() {
        this.setState(prevState => ({ showWeather: !prevState.showWeather }))
        this.setState({ city: "" })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <div className="searchBar">
                    <input className="searchCity" name="city" value={this.state.city} placeholder="Enter City (e.g.London)" onChange={this.handleChange} />
                    <div className="searchButton">
                        {!this.state.showWeather && <button onClick={this.handleSubmit}>&#x1F50D;</button>}
                        {this.state.showWeather && <button onClick={this.handleReset}>&#10227;</button>}
                    </div>
                </div >
                <div className="weather">
                    {this.state.showWeather ? <WeatherComponent cityName={this.state.city} /> : null}
                </div>
            </div>
        )
    }
}

export default Weather