import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";

import { currentWeatherDataAction } from "../actions/currentWeatherAction";
import { monthlyWeatherDataAction } from "../actions/monthlyWeatherAction";
import { deleteCookie } from "../utils/cookies";

import "./dashboardPage.css";

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Select",
      drawerOpen: true,
      selectButtonClicked: false,
    };
  }

  handleChange = (event) => {
    this.setState({ selectButtonClicked: true });
    this.setState({ value: event.target.value }, () => {
      this.props.dispatch(currentWeatherDataAction(this.state.value));
      this.props.dispatch(monthlyWeatherDataAction(this.state.value));
    });
  };

  handleLogout = () => {
    deleteCookie("token");
    this.props.history.push("./login", { logoutButtonClicked: true });
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
      // console.log("CURRENT Rs --->", currentWeatherData);
    }

    if (this.props.response.monthlyWeather.hasOwnProperty("response")) {
      monthlyWeatherData = this.props.response.monthlyWeather.response;
      // console.log("MONTHLY Rs--->", monthlyWeatherData);
    }

    if (
      currentWeatherData &&
      monthlyWeatherData &&
      currentWeatherData.cod === 200 &&
      monthlyWeatherData.cod === "200"
    ) {
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
          <div
            className={
              this.state.drawerOpen === false
                ? "container__card_drawer_open"
                : "container__card"
            }
            key={weather.dt}
          >
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
    } else {
      if (currentWeatherData && currentWeatherData.cod !== 200) {
        return (
          <div className="dashboard_response_failure">
            *** Failed to receive response from CURRENT_WEATHER_API. Received{" "}
            {currentWeatherData.cod} response. Message:{" "}
            {currentWeatherData.message}
          </div>
        );
      }
      if (monthlyWeatherData && monthlyWeatherData.cod !== "200") {
        return (
          <div className="dashboard_response_failure">
            *** Failed to receive response from MONTHLY_WEATHER_API. Received{" "}
            {monthlyWeatherData.cod} response. Message:{" "}
            {monthlyWeatherData.message}
          </div>
        );
      }
    }

    const { selectButtonClicked } = this.state;

    return (
      <div className="dashboard">
        <div>
          <h2 className="dashboard__header"> Dashboard </h2>
          <button
            className="dashboard__button__logout"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="dashboard__content">
          <div className="dashboard__drawer" hidden={this.state.drawerOpen}>
            <h3>About</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="dashboard__container">
            <div>
              <h4 className="dashboard__form__header"> Select City: </h4>
              <div className="dashboard__form__select__div">
                <select
                  className="dashboard__form__select"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <option value="Select">Select</option>
                  <option value="London">London</option>
                  <option value="Paris">Paris</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Santiago">Santiago</option>
                </select>
              </div>
            </div>
            <div className="dashboard__form__loader">
              {selectButtonClicked ? (
                <>
                  {currentWeatherData &&
                  monthlyWeatherData &&
                  currentWeatherData.cod === 200 &&
                  monthlyWeatherData.cod === "200" ? (
                    <form className="dashboard__form">
                      <div className="parent__container">
                        <div className="child_one_container">
                          <h5 className="container__header">
                            <u>Current Weather Data</u>
                          </h5>
                          <strong>CITY: </strong>
                          {currentWeatherData.name}
                          <br />
                          <strong>Timezone: </strong>
                          {currentWeatherData.timezone}
                          <br />
                          <strong>Current Forecast: </strong>
                          <br />
                          <div
                            className={
                              this.state.drawerOpen === false
                                ? "container__card_drawer_open"
                                : "container__card"
                            }
                          >
                            <strong>Main:</strong>
                            <ul>
                              <li>
                                Feels Like: {currentWeatherData.main.feels_like}
                              </li>
                              <li>
                                Humidity: {currentWeatherData.main.humidity}
                              </li>
                              <li>
                                Pressure: {currentWeatherData.main.pressure}
                              </li>
                              <li>
                                Temperature: {currentWeatherData.main.temp}
                              </li>
                              <li>
                                Max Temp: {currentWeatherData.main.temp_max}
                              </li>
                              <li>
                                Min Temp: {currentWeatherData.main.temp_min}
                              </li>
                            </ul>
                            <strong>Weather:</strong>
                            {currentWeatherRes}
                          </div>
                        </div>
                        <div className="child_two_container">
                          <h5 className="container__header">
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
                          <strong>5 Day Forecast: </strong>
                          <br />
                          <div className="parent_container_card">
                            {monthlyWeatherRes}
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="dashboard__loader">
                      <Loader
                        type="Bars"
                        color="#b0bec5"
                        height="100"
                        width="100"
                      />
                    </div>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              <button className="dashboard__button" onClick={this.handleAbout}>
                ABOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (response) => ({ response });
export default connect(mapStateToProps)(DashboardPage);
