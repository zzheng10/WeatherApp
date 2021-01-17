import React from "react"
import "./WeatherCard.css"

class WeatherComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false,
            day: 0,
            weather: [
                {
                    date: "",
                    city: "",
                    country: "",
                    iconLink: "//:0",
                    minTemp: "",
                    maxTemp: "",
                    description: ""
                }
            ]
        }
        this.nextDay = this.nextDay.bind(this)
        this.prevDay = this.prevDay.bind(this)
    }

    componentDidMount() {
        this.setState({ loading: true })
        const apiKey = "4ffe715e32dc7517ae29b766a96cc139"
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.cityName}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === "404" || data.cod === "400") {
                    alert("PLEASE ENTER VALID CITY!")
                }
                else {
                    this.setState({
                        loading: false,
                        weather: this.manipulateData(data)
                    })
                }
            })
            .catch(err => {
                alert("error")
            })
    }

    manipulateData(data) {
        let weatherData = []
        let temp = []
        for (let i = 0; i < data.cnt; i++) {
            temp.push(data.list[i].main.temp)
            if ((i + 1) % 8 === 0) {
                weatherData.push({
                    date: data.list[i - 7].dt_txt,
                    city: data.city.name,
                    country: data.city.country,
                    minTemp: Math.round(Math.min(...temp)),
                    maxTemp: Math.round(Math.max(...temp)),
                    iconLink: `http://openweathermap.org/img/wn/${data.list[i - 7].weather[0].icon}@2x.png`,
                    description: data.list[i - 7].weather[0].main
                })
                temp = []
            }
        }
        return (weatherData)
    }

    nextDay() {
        this.setState(prevState => {
            return {
                day: prevState.day + 1
            }
        })
    }

    prevDay() {
        this.setState(prevState => {
            return {
                day: prevState.day - 1
            }
        })
    }

    getDay(d) {
        if (d === "") {
            return ("")
        }
        let dt = d.split(" ")[0].split("-")
        let date = new Date(parseInt(dt[0]), parseInt(dt[1] - 1), parseInt(dt[2]))
        return (date.toString().split(" ")[0])
    }

    render() {
        console.log(this.state.weather)
        return (
            <div>
                {!this.state.loading &&
                    <div className="weatherCard">
                        <h1>{this.getDay(this.state.weather[this.state.day].date)}</h1>
                        <h3>{this.state.weather[this.state.day].city}</h3>
                        <p>{this.state.weather[this.state.day].country}</p>
                        <img src={this.state.weather[this.state.day].iconLink} alt="" />
                        <h2>{this.state.weather[this.state.day].minTemp}&#176;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.weather[this.state.day].maxTemp}&#176;C</h2>
                        <h3>{this.state.weather[this.state.day].description}</h3>
                        {this.state.day > 0 && <button onClick={this.prevDay}>&#8592;</button>}
                        {this.state.day < 4 && <button onClick={this.nextDay}>&#8594;</button>}
                    </div>
                }
            </div>
        )
    }
}

export default WeatherComponent