import React, { Component } from "react";
import { connect } from "react-redux";

import { currentWeatherDataAction } from "../actions/currentWeatherAction";
import { monthlyWeatherDataAction } from "../actions/monthlyWeatherAction";
import { deleteCookie } from "../utils/cookies";

import "./dashboardPage.css";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "Select", drawerOpen: true };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value }, () => {
      this.props.dispatch(currentWeatherDataAction(this.state.value));
      this.props.dispatch(monthlyWeatherDataAction(this.state.value));
    });
  };

  handleLogout = () => {
    deleteCookie("token");
    window.location.reload();
  };

  handleAbout = (event) => {
    event.preventDefault();
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  render() {
    let currentWeatherData, monthlyWeatherData;
    let currentWeatherRes, monthlyWeatherRes;

    if (this.props.response.currentWeather.hasOwnProperty("response")) {
      currentWeatherData = this.props.response.currentWeather.response;
      // console.log("CURRENT --->", currentWeatherData);
    }

    if (this.props.response.monthlyWeather.hasOwnProperty("response")) {
      monthlyWeatherData = this.props.response.monthlyWeather.response;
      // console.log("MONTHLY --->", monthlyWeatherData);
    }

    if (currentWeatherData && monthlyWeatherData) {
      currentWeatherRes = currentWeatherData.weather.map((weather) => {
        return (
          <div key={weather.id}>
            {weather.main}: {weather.description}
          </div>
        );
      });

      monthlyWeatherRes = monthlyWeatherData.list.map((weather) => {
        const perDayWeather = weather.weather.map((dayWeather) => {
          return (
            <div key={dayWeather.id}>
              {dayWeather.main}: {dayWeather.description}
            </div>
          );
        });
        return (
          <div key={weather.dt}>
            <strong>Main:</strong>
            <ul>
              <li>Feels Like: {weather.main.feels_like}</li>
              <li>Humidity: {weather.main.humidity}</li>
              <li>Pressure: {weather.main.pressure}</li>
              <li>Temperature: {weather.main.temp}</li>
              <li>Max Temp: {weather.main.temp_max}</li>
              <li>Min Temp: {weather.main.temp_min}</li>
            </ul>
            <strong>Weather: </strong>
            {perDayWeather}
          </div>
        );
      });
    }

    return (
      <div className="dashboard">
        <div style={{ display: "inline", width: "100vh" }}>
          <h2> Dashboard </h2>
          <button className="logout__button" onClick={this.handleLogout}>
            Logout
          </button>
        </div>

        <div className="aboutDrawer" hidden={this.state.drawerOpen}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <h4> Select City </h4>
        <br />
        <form className="dashboard__form">
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Select">Select</option>
            <option value="London">London</option>
            <option value="Paris">Paris</option>
            <option value="Toronto">Toronto</option>
            <option value="Santiago">Santiago</option>
          </select>
          <br />
          <br />
          {currentWeatherData && monthlyWeatherData && (
            <div className="wrapper-flex">
              <div className="container1">
                <h5>
                  <u>Current Weather Data</u>
                </h5>
                <strong>CITY: </strong>
                {currentWeatherData.name}
                <br />
                <strong>Timezone: </strong>
                {currentWeatherData.timezone}
                <br />
                <strong>Main:</strong>
                <ul>
                  <li>Feels Like: {currentWeatherData.main.feels_like}</li>
                  <li>Humidity: {currentWeatherData.main.humidity}</li>
                  <li>Pressure: {currentWeatherData.main.pressure}</li>
                  <li>Temperature: {currentWeatherData.main.temp}</li>
                  <li>Max Temp: {currentWeatherData.main.temp_max}</li>
                  <li>Min Temp: {currentWeatherData.main.temp_min}</li>
                </ul>
                <strong>Weather:</strong>
                {currentWeatherRes}
              </div>
              <div className="container2">
                <h5>
                  <u>5 Day Weather Forecast</u>
                </h5>
                <strong>CITY: </strong>
                {monthlyWeatherData.city.name}
                <br />
                <strong>Country: </strong>
                {monthlyWeatherData.city.country}
                <br />
                <strong>Population: </strong>
                {monthlyWeatherData.city.population}
                <br />
                <strong>Timezone: </strong>
                {monthlyWeatherData.city.timezone}
                <br />
                <strong>Daily Forecast: </strong>
                {monthlyWeatherRes}
              </div>
            </div>
          )}
          <div>
            <button className="about" onClick={this.handleAbout}>
              ABOUT
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(DashboardPage);
